import axios from 'axios';

export const googleMapsAPI = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
});

// TODO add a middleware to check for an error and throw an error if there is one. Otherwise, extract only the data
export const backendAPI = axios.create({
  baseURL: process.env.REACT_APP_USE_LOCAL_BACKEND
    ? 'http://localhost:3002/'
    : 'https://homehubdope.com:3001/',
});
