import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const contactAPI = {
    getContacts: (bloodGroup = '') => {
        const params = bloodGroup ? { bloodGroup } : {};
        return api.get('/api/contacts', { params });
    },
    getAllContacts: () => api.get('/api/contacts/admin/all'),
    addContact: (contactData) => api.post('/api/contacts', contactData),
    updateContact: (id, contactData) => api.put(`/api/contacts/${id}`, contactData),
    deleteContact: (id) => api.delete(`/api/contacts/${id}`),
    recordCall: (id, duration) => api.post(`/api/contacts/${id}/call`, { duration }),
    getRecentCalls: () => api.get('/api/contacts/analytics/recent-calls'),
    getBloodGroupStats: () => api.get('/api/contacts/analytics/blood-group-stats'),
    getCallFrequency: () => api.get('/api/contacts/analytics/call-frequency')
};

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    getAllUsers: () => api.get('/auth/users'),
    getUserContacts: (userId) => api.get(`/auth/users/${userId}/contacts`)
};