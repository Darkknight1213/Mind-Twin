from fastapi import FastAPI
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.models import SessionLocal, User, Lesson
from app.crud.crud import create_user, get_user, create_lesson, get_lesson, get_lessons

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "MindTwin backend is running!"}

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
# USER REGISTRATION (basic example, no hashing for now)
@app.post("/users/")
def register_user(email: str, name: str, password: str, db: Session = Depends(get_db)):
    db_user = create_user(db, email=email, name=name, hashed_password=password)
    return db_user

# GET USER BY ID
@app.get("/users/{user_id}")
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = get_user(db, user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# CREATE LESSON
@app.post("/lessons/")
def create_new_lesson(title: str, description: str, content: str, xp_reward: int = 50, db: Session = Depends(get_db)):
    lesson = create_lesson(db, title=title, description=description, content=content, xp_reward=xp_reward)
    return lesson

# GET LESSON BY ID
@app.get("/lessons/{lesson_id}")
def read_lesson(lesson_id: int, db: Session = Depends(get_db)):
    lesson = get_lesson(db, lesson_id)
    if lesson is None:
        raise HTTPException(status_code=404, detail="Lesson not found")
    return lesson

# GET ALL LESSONS
@app.get("/lessons/")
def read_lessons(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    lessons = get_lessons(db, skip=skip, limit=limit)
    return lessons

from app.crud.crud import create_checkin, get_user_checkins

@app.post("/checkin/")
def daily_checkin(user_id: int, mood: str, energy: int, db: Session = Depends(get_db)):
    # Add logic to update streak, XP for user (bonus: check previous day's check-in)
    checkin = create_checkin(db, user_id, mood, energy)
    user = get_user(db, user_id)
    # Sample logic for streak/XP
    user.xp += 10
    user.streak += 1  # Reset to 1 if you want to check gap
    db.commit()
    db.refresh(user)
    return {"checkin": checkin, "xp": user.xp, "streak": user.streak}

@app.get("/dashboard/{user_id}")
def get_dashboard(user_id: int, db: Session = Depends(get_db)):
    user = get_user(db, user_id)
    checkins = get_user_checkins(db, user_id)
    total_lessons = 0  # You can count lessons if you make a completed-lessons table later
    return {
        "xp": user.xp,
        "level": user.level,
        "streak": user.streak,
        "recent_moods": [c.mood for c in checkins],
        "total_lessons_completed": total_lessons
    }

from app.crud.crud import create_journal_entry, get_journal_entries

@app.post("/journal/")
def new_journal_entry(user_id: int, content: str, mood: str = None, db: Session = Depends(get_db)):
    entry = create_journal_entry(db, user_id, content, mood)
    user = get_user(db, user_id)
    user.xp += 15  # Award XP for journaling
    db.commit()
    db.refresh(user)
    return {"entry": entry, "user_xp": user.xp}

@app.get("/journal/{user_id}")
def list_journals(user_id: int, db: Session = Depends(get_db)):
    entries = get_journal_entries(db, user_id)
    return entries

@app.post("/chatbot/")
def chatbot_message(user_id: int, message: str):
    # For hackathon, respond with canned positive messages
    responses = [
        "You're doing better than you think! Keep going 💪",
        "It's okay to have tough days—your progress matters.",
        "Every small step is a big win. Proud of you!",
        "If you need help, reach out. You're not alone."
    ]
    import random
    reply = random.choice(responses)
    return {"reply": reply}


