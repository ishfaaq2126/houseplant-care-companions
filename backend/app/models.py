from sqlalchemy import Column, Integer, String, Date, Boolean
from .database import Base

class Plant(Base):
    __tablename__ = "plants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    species = Column(String)
    watering_interval = Column(Integer)
    last_watered = Column(Date)
    sunlight = Column(String)
    notes = Column(String, nullable=True)