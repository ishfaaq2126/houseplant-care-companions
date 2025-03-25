export interface Plant {
    id: number;
    name: string;
    species: string;
    watering_interval: number;
    last_watered?: string;
    sunlight: string;
    notes?: string;
  }
  
  export interface PlantFormData {
    name: string;
    species: string;
    watering_interval: number;
    sunlight: string;
    notes?: string;
  }