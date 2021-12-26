import axios from 'axios';

export const baseURL = 'http://localhost:3001';
// export const baseURL = window.location.protocol + '//' + window.location.host

export const instance = axios.create({
    baseURL: baseURL + '/api/',
});
