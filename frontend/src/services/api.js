import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const api = {
  // Test Bookings
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API}/bookings`, bookingData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create booking');
    }
  },

  getBookings: async () => {
    try {
      const response = await axios.get(`${API}/bookings`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch bookings');
    }
  },

  // Contact Inquiries
  createContact: async (contactData) => {
    try {
      const response = await axios.post(`${API}/contacts`, contactData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to create contact inquiry');
    }
  },

  getContacts: async () => {
    try {
      const response = await axios.get(`${API}/contacts`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch contacts');
    }
  },

  // Health Packages
  getPackages: async () => {
    try {
      const response = await axios.get(`${API}/packages`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.detail || 'Failed to fetch packages');
    }
  }
};
