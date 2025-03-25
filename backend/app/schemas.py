from pydantic import BaseModel
from typing import Optional
from datetime import date

class PlantBase(BaseModel):
    name: str
    species: str
    watering_interval: int
    sunlight: str
    notes: Optional[str] = None

class PlantCreate(PlantBase):
    pass

class PlantUpdate(BaseModel):
    name: Optional[str] = None
    species: Optional[str] = None
    watering_interval: Optional[int] = None
    last_watered: Optional[date] = None
    sunlight: Optional[str] = None
    notes: Optional[str] = None

class Plant(PlantBase):
    id: int
    last_watered: Optional[date] = None

    class Config:
        orm_mode = True