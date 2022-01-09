import {AppStateType} from './redux-store';

export const s_getCitiesLoading = (state: AppStateType) => {
    return state.novaPoshta.citiesLoading;
};

export const s_getWarehousesLoading = (state: AppStateType) => {
    return state.novaPoshta.wareHousesLoading;
};

export const s_getCities = (state: AppStateType) => {
    return state.novaPoshta.cities;
};


export const s_getWarehouses = (state: AppStateType) => {
    return state.novaPoshta.warehouses;
};
