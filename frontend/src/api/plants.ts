import axios from 'axios';
import { Plant, PlantFormData } from '../types/plant';

const API_URL = 'http://localhost:8000/plants';

export const getPlants = async (): Promise<Plant[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPlant = async (id: number): Promise<Plant> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createPlant = async (plant: PlantFormData): Promise<Plant> => {
  const response = await axios.post(API_URL, plant);
  return response.data;
};

export const updatePlant = async (id: number, plant: Partial<PlantFormData>): Promise<Plant> => {
  const response = await axios.put(`${API_URL}/${id}`, plant);
  return response.data;
};

export const deletePlant = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const getWateringSchedule = async (daysAhead: number = 7): Promise<any> => {
    const response = await axios.get(`${API_URL}/watering-schedule/?days_ahead=${daysAhead}`);
    return response.data;
  };