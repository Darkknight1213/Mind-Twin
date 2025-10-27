from datetime import datetime
from sqlalchemy.orm import Session
from models.models import User, Lesson

# USERS CRUD
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def create_user(db: Session, email: str, name: str, hashed_password: str):
    user = User(email=email, name=name, password=hashed_password)
    db.add(user)
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

from models.models import CheckIn

def create_checkin(db: Session, user_id: int, mood: str, energy: int):
    checkin = CheckIn(user_id=user_id, mood=mood, energy=energy)
    db.add(checkin)
    db.commit()
    db.refresh(checkin)
    return checkin

def get_user_checkins(db: Session, user_id: int, days: int = 7):
    recent = datetime.datetime.utcnow() - datetime.timedelta(days=days)
    return db.query(CheckIn).filter(CheckIn.user_id == user_id, CheckIn.date >= recent).all()

from models.models import JournalEntry

def create_journal_entry(db: Session, user_id: int, content: str, mood: str = None):
    entry = JournalEntry(user_id=user_id, content=content, mood=mood)
    db.add(entry)
    db.commit()
    db.refresh(entry)
    return entry

def get_journal_entries(db: Session, user_id: int, days: int = 7):
    recent = datetime.datetime.utcnow() - datetime.timedelta(days=days)
    return db.query(JournalEntry).filter(JournalEntry.user_id == user_id, JournalEntry.date >= recent).all()
