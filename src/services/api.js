import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
});

// all contact-related API calls
export const contactAPI = {
  // fetch contacts with optional filters
  getContacts: (bloodGroup = '', userEmail = 'user@example.com') => 
    api.get(`/contacts?userEmail=${encodeURIComponent(userEmail)}${bloodGroup ? `&bloodGroup=${encodeURIComponent(bloodGroup)}` : ''}`),
  
  // create a new contact
  addContact: (contact, userEmail = 'user@example.com') => 
    api.post('/contacts', { ...contact, userEmail }),
  
  // update existing contact
  updateContact: (id, contact) => 
    api.put(`/contacts/${id}`, contact),
  
  // remove contact
  deleteContact: (id) => 
    api.delete(`/contacts/${id}`),
  
  // log a call for tracking
  recordCall: (id, duration = 0) => 
    api.post(`/contacts/${id}/call`, { duration }),
  
  // analytics endpoints
  getRecentCalls: (userEmail = 'user@example.com') => 
    api.get(`/contacts/analytics/recent-calls?userEmail=${userEmail}`),
  
  getBloodGroupStats: (userEmail = 'user@example.com') => 
    api.get(`/contacts/analytics/blood-group-stats?userEmail=${userEmail}`),
  
  getCallFrequency: (userEmail = 'user@example.com') => 
    api.get(`/contacts/analytics/call-frequency?userEmail=${userEmail}`),
};

// user authentication API calls
export const userAPI = {
  login: (email, password) => 
    api.post('/users/login', { email, password }),
  
  logout: (email) => 
    api.post('/users/logout', { email }),
  
  signup: (email, password, name) => 
    api.post('/users/signup', { email, password, name }),
};