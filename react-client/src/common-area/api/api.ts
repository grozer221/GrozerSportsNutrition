import axios from 'axios';

export const novaPoshtaInstance = axios.create({
    baseURL: 'https://api.novaposhta.ua/v2.0/json/',
});
