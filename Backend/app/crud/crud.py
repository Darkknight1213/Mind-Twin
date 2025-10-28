from datetime import datetime
from sqlalchemy.orm import Session
from app.models.models import User, Lesson

# USERS CRUD
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, email: str, name: str, hashed_password: str):
    user = User(email=email, name=name, password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
def update_user_profile(db: Session, user_id: int, name=None, avatar_url=None, initial_mood=None, preferences=None):
    user = db.query(User).filter(User.id == user_id).first()
    if name is not None:
        user.name = name
    if avatar_url is not None:
        user.avatar_url = avatar_url
    if initial_mood is not None:
        user.initial_mood = initial_mood
    if preferences is not None:
        user.preferences = preferences
    db.commit()
    db.refresh(user)
    return user

def set_onboarding_complete(db: Session, user_id: int):
    user = db.query(User).filter(User.id == user_id).first()
    user.onboarding_complete = 1
    db.commit()
    db.refresh(user)
    return user

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

# LESSONS CRUD
def create_lesson(db: Session, title: str, description: str, content: str, xp_reward: int = 50):
    lesson = Lesson(title=title, description=description, content=content, xp_reward=xp_reward)
    db.add(lesson)
    db.commit()
    db.refresh(lesson)
    return lesson

def get_lesson(db: Session, lesson_id: int):
    return db.query(Lesson).filter(Lesson.id == lesson_id).first()

def get_lessons(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Lesson).offset(skip).limit(limit).all()

from app.models.models import CheckIn

def create_checkin(db: Session, user_id: int, mood: str, energy: int):
    checkin = CheckIn(user_id=user_id, mood=mood, energy=energy)
    db.add(checkin)
    db.commit()
    db.refresh(checkin)
    return checkin

def get_user_checkins(db: Session, user_id: int, days: int = 7):
    recent = datetime.datetime.utcnow() - datetime.timedelta(days=days)
    return db.query(CheckIn).filter(CheckIn.user_id == user_id, CheckIn.date >= recent).all()

from app.models.models import JournalEntry

def create_journal_entry(
    db: Session, user_id: int, content: str, mood: str = None,
    type: str = "text", voice_url: str = None, photo_url: str = None
):
    entry = JournalEntry(
        user_id=user_id,
        content=content,
        mood=mood,
        type=type,
        voice_url=voice_url,
        photo_url=photo_url
    )
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry


def get_journal_entries(db: Session, user_id: int, days: int = 7):
    recent = datetime.datetime.utcnow() - datetime.timedelta(days=days)
    return db.query(JournalEntry).filter(JournalEntry.user_id == user_id, JournalEntry.date >= recent).all()

from app.models.models import CompletedLesson

def mark_lesson_completed(db: Session, user_id: int, lesson_id: int):
    completed = CompletedLesson(user_id=user_id, lesson_id=lesson_id)
    db.add(completed)
    db.commit()
    db.refresh(completed)
    return completed

def user_has_completed_lesson(db: Session, user_id: int, lesson_id: int):
    return db.query(CompletedLesson).filter(
        CompletedLesson.user_id == user_id, CompletedLesson.lesson_id == lesson_id
    ).first()
