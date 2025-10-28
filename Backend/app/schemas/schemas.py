from pydantic import BaseModel, EmailStr
from typing import Optional, List

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    name: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    name: str
    avatar_url: str = None
    created_at: str
    initial_mood: str = None
    onboarding_complete: int = 0
    preferences: str = None
class ProfileUpdateRequest(BaseModel):
    name: Optional[str]
    avatar_url: Optional[str]
    initial_mood: Optional[str]
    preferences: Optional[str]

# ----- LESSONS -----
class LessonResponse(BaseModel):
    id: int
    title: str
    description: str
    content: str
    xp_reward: int
    completed: Optional[bool] = False

class LessonCompleteRequest(BaseModel):
    user_id: int
    lesson_id: int

# ----- JOURNAL -----
class JournalEntryResponse(BaseModel):
    id: int
    user_id: int
    content: str
    mood: Optional[str] = None
    date: str

class JournalCreateRequest(BaseModel):
    user_id: int
    content: str
    mood: Optional[str] = None

# ----- CHECK-IN -----
class CheckInCreateRequest(BaseModel):
    user_id: int
    mood: str
    energy: int

class CheckInResponse(BaseModel):
    id: int
    user_id: int
    mood: str
    energy: int
    date: str

# ----- DASHBOARD -----
class DashboardResponse(BaseModel):
    xp: int
    level: int
    streak: int
    recent_moods: List[str]
    total_lessons_completed: int

# ----- PROFILE -----
class ProfileUpdateRequest(BaseModel):
    name: Optional[str]
    avatar_url: Optional[str]

class LessonCompleteRequest(BaseModel):
    lesson_id: int

class LessonCompletedResponse(BaseModel):
    user_id: int
    lesson_id: int
    completed_at: str
    xp: int
    level: int
from typing import Optional

class JournalCreateRequest(BaseModel):
    user_id: int
    content: str
    mood: Optional[str] = None
    type: Optional[str] = "text"
    voice_url: Optional[str] = None
    photo_url: Optional[str] = None

class JournalEntryResponse(BaseModel):
    id: int
    user_id: int
    content: str
    mood: Optional[str]
    date: str
    type: Optional[str]
    voice_url: Optional[str]
    photo_url: Optional[str]

from typing import List

class DashboardResponse(BaseModel):
    xp: int
    level: int
    streak: int
    badges: List[str] = []
    recent_moods: List[str]
    total_lessons_completed: int
