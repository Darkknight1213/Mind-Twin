from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from sqlalchemy.orm import Session
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta
from models.models import SessionLocal, User, Lesson
from schemas.schemas import LoginRequest, RegisterRequest, UserResponse, LessonResponse, JournalEntryResponse, \
    JournalCreateRequest, CheckInCreateRequest, CheckInResponse, DashboardResponse
from crud.crud import create_user, get_user, create_lesson, get_lesson, get_lessons, get_user_by_email, \
    create_checkin, get_user_checkins, create_journal_entry, get_journal_entries
from schemas.schemas import LessonCompleteRequest, LessonCompletedResponse
from crud.crud import mark_lesson_completed, user_has_completed_lesson, get_lesson
from schemas.schemas import JournalCreateRequest, JournalEntryResponse
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------ AUTH/JWT ------------------------
SECRET_KEY = "supersecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta if expires_delta else timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db, email)
    if user is None:
        raise credentials_exception
    return user

# ----------------------------------------------------------

@app.get("/")
def read_root():
    return {"message": "MindTwin backend is running!"}

# Registration Endpoint
@app.post("/users/", response_model=UserResponse)
def register_user(data: RegisterRequest, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(data.password)
    db_user = create_user(db, email=data.email, name=data.name, hashed_password=hashed_password)
    return db_user

# Login Endpoint
@app.post("/auth/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    access_token = create_access_token(data={"sub": user.email})
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id
    }

# Get Current User (protected)
@app.get("/auth/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user

# Get User by ID
@app.get("/users/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

from app.schemas.schemas import ProfileUpdateRequest
from app.crud.crud import update_user_profile, set_onboarding_complete

@app.get("/profile", response_model=UserResponse)
def get_profile(current_user: User = Depends(get_current_user)):
    return current_user

@app.put("/profile", response_model=UserResponse)
def update_profile(data: ProfileUpdateRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user = update_user_profile(
        db,
        current_user.id,
        name=data.name,
        avatar_url=data.avatar_url,
        initial_mood=data.initial_mood,
        preferences=data.preferences,
    )
    return user

@app.put("/onboarding/complete", response_model=UserResponse)
def complete_onboarding(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    user = set_onboarding_complete(db, current_user.id)
    return user


# Lessons
@app.post("/lessons/", response_model=LessonResponse)
def create_new_lesson(data: LessonResponse, db: Session = Depends(get_db)):
    lesson = create_lesson(db, title=data.title, description=data.description, content=data.content, xp_reward=data.xp_reward)
    return lesson

@app.get("/lessons/{lesson_id}", response_model=LessonResponse)
def read_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = get_lesson(db, lesson_id)
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

@app.get("/lessons/", response_model=list[LessonResponse])
def read_lessons(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    lessons = get_lessons(db, skip=skip, limit=limit)
    return lessons


@app.post("/lessons/{lesson_id}/complete", response_model=LessonCompletedResponse)
def complete_lesson(lesson_id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    # Check if already completed
    if user_has_completed_lesson(db, current_user.id, lesson_id):
        raise HTTPException(status_code=400, detail="Lesson already completed")
    # Mark as completed
    completed = mark_lesson_completed(db, current_user.id, lesson_id)
    lesson = get_lesson(db, lesson_id)
    # Award XP/level
    current_user.xp += lesson.xp_reward
    if current_user.xp >= 100 * current_user.level:
        current_user.level += 1
    db.commit()
    db.refresh(current_user)
    return LessonCompletedResponse(
        user_id=current_user.id,
        lesson_id=lesson_id,
        completed_at=completed.completed_at.strftime("%Y-%m-%d %H:%M:%S"),
        xp=current_user.xp,
        level=current_user.level
    )
    
# CheckIn (Daily Mood)
@app.post("/checkin/", response_model=CheckInResponse)
def daily_checkin(data: CheckInCreateRequest, db: Session = Depends(get_db)):
    checkin = create_checkin(db, data.user_id, data.mood, data.energy)
    user = get_user(db, data.user_id)
    user.xp += 10
    user.streak += 1
    db.commit()
    db.refresh(user)
    return checkin

# Dashboard/Stats
from app.models.models import CompletedLesson

@app.get("/dashboard/{user_id}", response_model=DashboardResponse)
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    checkins = get_user_checkins(db, user_id)
    total_lessons = db.query(CompletedLesson).filter(CompletedLesson.user_id == user_id).count()
    # Example dummy badge logic, expand as you wish!
    badges = []
    if user.streak >= 7:
        badges.append("7-Day Streak")
    if user.xp >= 100:
        badges.append("Level 1 XP Achiever")
    return DashboardResponse(
        xp=user.xp,
        level=user.level,
        streak=user.streak,
        badges=badges,
        recent_moods=[c.mood for c in checkins],
        total_lessons_completed=total_lessons
    )

# Journal
@app.post("/journal/", response_model=JournalEntryResponse)
def new_journal_entry(data: JournalCreateRequest, db: Session = Depends(get_db)):
    entry = create_journal_entry(
        db,
        data.user_id,
        data.content,
        data.mood,
        data.type,
        data.voice_url,
        data.photo_url
    )
    user = get_user(db, data.user_id)
    user.xp += 15  # Award XP for journaling
    db.commit()
    db.refresh(user)
    return entry

@app.get("/journal/{user_id}", response_model=list[JournalEntryResponse])
def list_journals(user_id: int, db: Session = Depends(get_db)):
    entries = get_journal_entries(db, user_id)
    return entries

# Chatbot
@app.post("/chatbot/")
def chatbot_message(user_id: int, message: str):
    responses = [
        "You're doing better than you think! Keep going 💪",
        "It's okay to have tough days—your progress matters.",
        "Every small step is a big win. Proud of you!",
        "If you need help, reach out. You're not alone."
    ]
    import random
    reply = random.choice(responses)
    return {"reply": reply}
