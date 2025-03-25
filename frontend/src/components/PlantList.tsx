import React, { useEffect, useState } from 'react';
import { getPlants, deletePlant } from '../api/plants';
import { Plant } from '../types/plant';  // Import Plant from types
import { format, parseISO } from 'date-fns';
import { Link } from 'react-router-dom';

const PlantList: React.FC = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const data = await getPlants();
        setPlants(data);
      } catch (error) {
        console.error('Error fetching plants:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deletePlant(id);
      setPlants(plants.filter(plant => plant.id !== id));
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Houseplant Care Companion</h1>
      <div className="action-links">
         <Link to="/add" className="link-button">Add New Plant</Link>
         <Link to="/schedule" className="link-button">View Watering Schedule</Link>
    </div>
      <div className="plant-list">
        {plants.map(plant => (
          <div key={plant.id} className="plant-card">
            <h2>{plant.name}</h2>
            <p>Species: {plant.species}</p>
            <p>Water every: {plant.watering_interval} days</p>
            {plant.last_watered && (
              <p>Last watered: {format(parseISO(plant.last_watered), 'MMM dd, yyyy')}</p>
            )}
            <p>Sunlight: {plant.sunlight}</p>
            {plant.notes && <p>Notes: {plant.notes}</p>}
            <div className="plant-actions">
              <Link to={`/edit/${plant.id}`}>Edit</Link>
              <button onClick={() => handleDelete(plant.id)}>Delete</button>
              <button>Water Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default PlantList;

