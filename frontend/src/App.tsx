import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PlantForm from './components/PlantForm';
import WateringSchedule from './components/WateringSchedule';

import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<PlantForm />} />
          <Route path="/edit/:id" element={<PlantForm />} />
          <Route path="/schedule" element={<WateringSchedule />} />

          
        </Routes>
      </div>
    </Router>
  );
};

export default App;