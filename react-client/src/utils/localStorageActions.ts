import {ProductInBasket} from '../types/types';

export const getAuthorizationHeader = (): string => {
    return localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '';
};

export const setBasketToLocalStorage = (productsInBasket: ProductInBasket[]) => {
    localStorage.setItem('productsInBasket', JSON.stringify(productsInBasket));
};

export const getBasketFromLocalStorage = (): ProductInBasket[] => {
    const productsInBasket = localStorage.getItem('productsInBasket');
    if (productsInBasket) {
        const productsInBasketParsed: ProductInBasket[] = JSON.parse(productsInBasket);
        return productsInBasketParsed;
    } else {
        return [];
    }
};
