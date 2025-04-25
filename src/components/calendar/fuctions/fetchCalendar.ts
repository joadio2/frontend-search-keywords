import axios from "axios";

const API_URL = "https://example.com/api/events"; // Cambia esta URL por la real

export const fetchEvents = async (): Promise<Event[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.events; // Asume que la API devuelve un objeto con un array de eventos
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
