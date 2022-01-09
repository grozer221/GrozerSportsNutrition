import {BaseThunkType, InferActionsTypes} from './redux-store';
import {novaPoshtaAPI} from '../common-area/api/nova-poshta';
import {City, Warehouse} from '../types/types';

let initialState = {
    citiesLoading: false,
    wareHousesLoading: false,
    cities: [] as City[],
    warehouses: [] as Warehouse[],
};

const novaPoshtaReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_CITIES_LOADING':
            return {
                ...state,
                citiesLoading: action.loading,
            };
        case 'SET_WAREHOUSES_LOADING':
            return {
                ...state,
                wareHousesLoading: action.loading,
            };
        case 'SET_CITIES':
            return {
                ...state,
                cities: action.cities,
            };
        case 'SET_WAREHOUSES':
            return {
                ...state,
                warehouses: action.warehouses,
            };
        case 'CLEAR_STATE':
            return {
                ...state,
                citiesLoading: false,
                wareHousesLoading: false,
                cities: [],
                warehouses: [],
            };
        default:
            return state;
    }
};

export const actions = {
    setCitiesLoading: (loading: boolean) => ({
        type: 'SET_CITIES_LOADING',
        loading,
    } as const),
    setWarehousesLoading: (loading: boolean) => ({
        type: 'SET_WAREHOUSES_LOADING',
        loading,
    } as const),
    setCities: (cities: City[]) => ({
        type: 'SET_CITIES',
        cities,
    } as const),
    setWarehouses: (warehouses: Warehouse[]) => ({
        type: 'SET_WAREHOUSES',
        warehouses,
    } as const),
    clearState: () => ({
        type: 'CLEAR_STATE',
    } as const),
};

export const loadCities = (likeCityName: string): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setCitiesLoading(true));
        const getCitiesResponse = await novaPoshtaAPI.getCities(likeCityName);
        dispatch(actions.setCities(getCitiesResponse.data[0].Addresses));
        dispatch(actions.setCitiesLoading(false));
    };

export const loadWarehouses = (deliveryCity: string): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setWarehousesLoading(true));
        const getWarehousesResponse = await novaPoshtaAPI.getWarehouses(deliveryCity);
        dispatch(actions.setWarehouses(getWarehousesResponse.data));
        dispatch(actions.setWarehousesLoading(false));
    };

export default novaPoshtaReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;
