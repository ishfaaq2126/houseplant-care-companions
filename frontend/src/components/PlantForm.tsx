import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Plant, PlantFormData } from '../types/plant';
import { getPlant, createPlant, updatePlant } from '../api/plants';

const PlantForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<PlantFormData>({
    name: '',
    species: '',
    watering_interval: 7,
    sunlight: 'medium',
    notes: '',
  });

  useEffect(() => {
    if (id) {
      const fetchPlant = async () => {
        try {
          const plant = await getPlant(parseInt(id));
          setFormData({
            name: plant.name,
            species: plant.species,
            watering_interval: plant.watering_interval,
            sunlight: plant.sunlight,
            notes: plant.notes || '',
          });
        } catch (error) {
          console.error('Error fetching plant:', error);
        }
      };
      fetchPlant();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'watering_interval' ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updatePlant(parseInt(id), formData);
      } else {
        await createPlant(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving plant:', error);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Plant' : 'Add New Plant'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Species:</label>
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Watering Interval (days):</label>
          <input
            type="number"
            name="watering_interval"
            value={formData.watering_interval}
            onChange={handleChange}
            min="1"
            required
          />
        </div>
        <div>
          <label>Sunlight:</label>
          <select
            name="sunlight"
            value={formData.sunlight}
            onChange={handleChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <label>Notes:</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate('/')}>Cancel</button>
      </form>
    </div>
  );
};

export default PlantForm;