import axios from 'axios';

export const instance = axios.create({
    withCredentials: true,
    baseURL: window.location.protocol + '//' + window.location.host + '/api/',
});
