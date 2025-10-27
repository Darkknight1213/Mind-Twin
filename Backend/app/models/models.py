from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

SQLALCHEMY_DATABASE_URL = os.environ.get("DATABASE_URL")

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, index=True)
    password = Column(String, nullable=False)
    xp = Column(Integer, default=0)
    level = Column(Integer, default=1)
    streak = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    
class Lesson(Base):
    __tablename__ = "lessons"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    content = Column(String, nullable=False)  # Store your JSON story arc/content as a string
    xp_reward = Column(Integer, default=50)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

class CheckIn(Base):
    __tablename__ = "checkins"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    mood = Column(String, nullable=False)  # e.g., "happy", "anxious", "sad"
    energy = Column(Integer, nullable=False)  # e.g., scale 1–5
    date = Column(DateTime, default=datetime.datetime.utcnow)

class CompletedLesson(Base):
    __tablename__ = "completedlessons"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    lesson_id = Column(Integer, nullable=False)
    completed_at = Column(DateTime, default=datetime.datetime.utcnow)

class JournalEntry(Base):
    __tablename__ = "journalentries"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=False)
    content = Column(String, nullable=False)
    mood = Column(String)
    date = Column(DateTime, default=datetime.datetime.utcnow)
