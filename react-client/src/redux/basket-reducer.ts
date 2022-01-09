import {BaseThunkType, InferActionsTypes} from './redux-store';
import {Product, ProductInBasket} from '../types/types';

let initialState = {
    loading: false,
    productsInBasket: [] as ProductInBasket[],
    totalPrice: 0,
};

const basketReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.loading,
            };
        case 'ADD_PRODUCT_TO_BASKET': {
            const newTotalPrice = state.totalPrice + action.product.priceUAH;
            if (state.productsInBasket.some(productInBasket => productInBasket.product === action.product))
                return {
                    ...state,
                    productsInBasket: state.productsInBasket.map(productInBasket =>
                        productInBasket.product === action.product
                            ? {
                                ...productInBasket,
                                quantity: productInBasket.quantity + 1,
                            }
                            : productInBasket),
                    totalPrice: newTotalPrice,
                };
            return {
                ...state,
                productsInBasket: [...state.productsInBasket, {product: action.product, quantity: 1}],
                totalPrice: newTotalPrice,
            };
        }
        case 'INCREMENT_PRODUCT_IN_BASKET': {
            const newTotalPrice = state.totalPrice + action.productInBasket.product.priceUAH;
            return {
                ...state,
                productsInBasket: state.productsInBasket.map(productInBasket =>
                    productInBasket === action.productInBasket
                        ? {
                            ...productInBasket,
                            quantity: productInBasket.quantity + 1,
                        }
                        : productInBasket),
                totalPrice: newTotalPrice,
            };
        }
        case 'DECREMENT_PRODUCT_IN_BASKET': {
            if (action.productInBasket.quantity === 1)
                return state;

            const newTotalPrice = state.totalPrice - action.productInBasket.product.priceUAH;
            return {
                ...state,
                productsInBasket: state.productsInBasket.map(productInBasket =>
                    productInBasket === action.productInBasket
                        ? {
                            ...productInBasket,
                            quantity: productInBasket.quantity - 1,
                        }
                        : productInBasket),
                totalPrice: newTotalPrice,
            };
        }
        case 'REMOVE_PRODUCT_FROM_BASKET': {
            const newTotalPrice = state.totalPrice - (action.productInBasket.product.priceUAH * action.productInBasket.quantity);
            return {
                ...state,
                productsInBasket: state.productsInBasket.filter(productInBasket => productInBasket !== action.productInBasket),
                totalPrice: newTotalPrice,
            };
        }
        default:
            return state;
    }
};

export const actions = {
    setLoading: (loading: boolean) => ({
        type: 'SET_LOADING',
        loading,
    } as const),
    addProductToBasket: (product: Product) => ({
        type: 'ADD_PRODUCT_TO_BASKET',
        product,
    } as const),
    incrementProductInBasket: (productInBasket: ProductInBasket) => ({
        type: 'INCREMENT_PRODUCT_IN_BASKET',
        productInBasket,
    } as const),
    decrementProductInBasket: (productInBasket: ProductInBasket) => ({
        type: 'DECREMENT_PRODUCT_IN_BASKET',
        productInBasket,
    } as const),
    removeProductFromBasket: (productInBasket: ProductInBasket) => ({
        type: 'REMOVE_PRODUCT_FROM_BASKET',
        productInBasket,
    } as const),
};

export const upload = (): ThunkType =>
    async (dispatch) => {
        dispatch(actions.setLoading(true));
        dispatch(actions.setLoading(false));
    };

export default basketReducer;

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsType>;