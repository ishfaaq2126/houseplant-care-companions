from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas
from .database import SessionLocal, engine
from datetime import datetime, timedelta

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/plants/", response_model=List[schemas.Plant])
def read_plants(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    plants = db.query(models.Plant).offset(skip).limit(limit).all()
    return plants

@app.post("/plants/", response_model=schemas.Plant)
def create_plant(plant: schemas.PlantCreate, db: Session = Depends(get_db)):
    db_plant = models.Plant(**plant.dict())
    db.add(db_plant)
    db.commit()
    db.refresh(db_plant)
    return db_plant

@app.get("/plants/{plant_id}", response_model=schemas.Plant)
def read_plant(plant_id: int, db: Session = Depends(get_db)):
    plant = db.query(models.Plant).filter(models.Plant.id == plant_id).first()
    if plant is None:
        raise HTTPException(status_code=404, detail="Plant not found")
    return plant

@app.put("/plants/{plant_id}", response_model=schemas.Plant)
def update_plant(plant_id: int, plant: schemas.PlantUpdate, db: Session = Depends(get_db)):
    db_plant = db.query(models.Plant).filter(models.Plant.id == plant_id).first()
    if db_plant is None:
        raise HTTPException(status_code=404, detail="Plant not found")
    
    for var, value in vars(plant).items():
        if value is not None:
            setattr(db_plant, var, value)
    
    db.commit()
    db.refresh(db_plant)
    return db_plant

@app.delete("/plants/{plant_id}")
def delete_plant(plant_id: int, db: Session = Depends(get_db)):
    plant = db.query(models.Plant).filter(models.Plant.id == plant_id).first()
    if plant is None:
        raise HTTPException(status_code=404, detail="Plant not found")
    db.delete(plant)
    db.commit()
    return {"message": "Plant deleted successfully"}




@app.get("/watering-schedule/", response_model=List[dict])
def get_watering_schedule(days_ahead: int = 7, db: Session = Depends(get_db)):
    schedule = []
    today = datetime.now().date()
    
    plants = db.query(models.Plant).all()
    
    for day_offset in range(days_ahead):
        current_date = today + timedelta(days=day_offset)
        day_plants = []
        
        for plant in plants:
            if plant.last_watered:
                next_water_date = plant.last_watered + timedelta(days=plant.watering_interval)
                if current_date >= next_water_date:
                    day_plants.append({
                        "name": plant.name,
                        "days_overdue": (current_date - next_water_date).days if current_date > next_water_date else 0
                    })
        
        schedule.append({
            "date": current_date.strftime("%Y-%m-%d"),
            "day_name": current_date.strftime("%A"),
            "plants": day_plants
        })
    
    return schedule