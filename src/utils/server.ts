import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_URL || 'http://localhost:3000',
});

export default api;
