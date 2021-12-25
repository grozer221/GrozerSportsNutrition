import axios from 'axios';

export const instance = axios.create({
    // baseURL: window.location.protocol + '//' + window.location.host + '/api/',
    baseURL: 'http://localhost:3001/api/',
});
