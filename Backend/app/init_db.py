from models.models import Base
from models.models import engine

def init_db():
    Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    print("Creating tables in the database...")
    init_db()
    print("All tables created!")
