import {AppStateType} from './redux-store';

export const s_getLoading = (state: AppStateType) => {
    return state.basket.loading;
};

export const s_getTotalPrice = (state: AppStateType) => {
    return state.basket.totalPrice;
};


export const s_getProductsInBasket = (state: AppStateType) => {
    return state.basket.productsInBasket;
};
