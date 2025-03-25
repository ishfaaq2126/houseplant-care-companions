# Houseplant Care Companion 🌱

A full-stack web app to track houseplant 
schedules and care tips.

## Features
- Add/edit/delete plants
- View watering schedule
- Mobile-friendly UI

## Technologies
- **Frontend**: React + TypeScript
- **Backend**: FastAPI (Python)
- **Database**: SQLite

## Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/your-username/repo-name.git
   ```

2. Run backend:
   ```bash
   cd backend
   python3 -m venv venv
   # Activate it (Mac/Linux)
   source venv/bin/activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

3. Run frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
