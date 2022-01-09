import {novaPoshtaInstance} from './api';
import {City, Warehouse} from '../../types/types';

const novaPoshtaApiKey = '8436b00089360cc4affd93ea6a7c5827';

export const novaPoshtaAPI = {
    getCities(likeCityName: string) {
        return novaPoshtaInstance.post<GetCitiesResponse>('', JSON.stringify({
            'apiKey': novaPoshtaApiKey,
            'modelName': 'Address',
            'calledMethod': 'searchSettlements',
            'methodProperties': {
                'CityName': likeCityName,
                'Limit': 15,
            },
        })).then(res => res.data);
    },
    getWarehouses(deliveryCity: string) {
        return novaPoshtaInstance.post<getWarehouseResponse>('', JSON.stringify({
            'apiKey': novaPoshtaApiKey,
            'modelName': 'Address',
            'calledMethod': 'getWarehouses',
            'methodProperties': {
                'CityRef': deliveryCity,
            },
        })).then(res => res.data);
    },
};

export type GetCitiesResponse = {
    success: boolean,
    data: [
        {
            TotalCount: number,
            Addresses: City[],
        }
    ]
    errors: string[],
}

export type getWarehouseResponse = {
    success: boolean,
    data: Warehouse[],
    errors: string[],
}
