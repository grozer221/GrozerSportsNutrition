import {BaseThunkType, InferActionsTypes} from './redux-store';
import {Product, ProductInBasket} from '../types/types';
import {setBasketToLocalStorage} from '../utils/localStorageActions';

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
        case 'SET_PRODUCTS_TO_BASKET': {
            let totalPrice = 0;
            action.productsInBasket.forEach(productInBasket => totalPrice += productInBasket.product.priceUAH * productInBasket.productQuantity);
            const returnState = {
                ...state,
                productsInBasket: action.productsInBasket,
                totalPrice: totalPrice,
            };
            setBasketToLocalStorage(returnState.productsInBasket);
            return returnState;
        }
        case 'ADD_PRODUCT_TO_BASKET': {
            const newTotalPrice = state.totalPrice + action.product.priceUAH;
            if (state.productsInBasket.some(productInBasket => productInBasket.product === action.product)) {
                var returnState = {
                    ...state,
                    productsInBasket: state.productsInBasket.map(productInBasket =>
                        productInBasket.product === action.product
                            ? {
                                ...productInBasket,
                                productQuantity: productInBasket.productQuantity + 1,
                            }
                            : productInBasket),
                    totalPrice: newTotalPrice,
                };
            } else {
                returnState = {
                    ...state,
                    productsInBasket: [...state.productsInBasket, {product: action.product, productQuantity: 1}],
                    totalPrice: newTotalPrice,
                };
            }
            setBasketToLocalStorage(returnState.productsInBasket);
            return returnState;
        }
        case 'INCREMENT_PRODUCT_IN_BASKET': {
            const newTotalPrice = state.totalPrice + action.productInBasket.product.priceUAH;
            const returnState = {
                ...state,
                productsInBasket: state.productsInBasket.map(productInBasket =>
                    productInBasket === action.productInBasket
                        ? {
                            ...productInBasket,
                            productQuantity: productInBasket.productQuantity + 1,
                        }
                        : productInBasket),
                totalPrice: newTotalPrice,
            };
            setBasketToLocalStorage(returnState.productsInBasket);
            return returnState;
        }
        case 'DECREMENT_PRODUCT_IN_BASKET': {
            console.log(action);
            if (action.productInBasket.productQuantity === 1){
                var returnState = state;
                setBasketToLocalStorage(returnState.productsInBasket);
                return returnState;
            }

            const newTotalPrice = state.totalPrice - action.productInBasket.product.priceUAH;
            returnState = {
                ...state,
                productsInBasket: state.productsInBasket.map(productInBasket =>
                    productInBasket === action.productInBasket
                        ? {
                            ...productInBasket,
                            productQuantity: productInBasket.productQuantity - 1,
                        }
                        : productInBasket),
                totalPrice: newTotalPrice,
            };
            setBasketToLocalStorage(returnState.productsInBasket);
            return returnState;
        }
        case 'REMOVE_PRODUCT_FROM_BASKET': {
            const newTotalPrice = state.totalPrice - (action.productInBasket.product.priceUAH * action.productInBasket.productQuantity);
            const returnState = {
                ...state,
                productsInBasket: state.productsInBasket.filter(productInBasket => productInBasket !== action.productInBasket),
                totalPrice: newTotalPrice,
            };
            setBasketToLocalStorage(returnState.productsInBasket);
            return returnState;
        }
        case 'CLEAR_STATE': {
            const returnState = {
                ...state,
                loading: false,
                productsInBasket: [] as ProductInBasket[],
                totalPrice: 0,
            };
            setBasketToLocalStorage(returnState.productsInBasket);
            return returnState;
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
    setProductsToBasket: (productsInBasket: ProductInBasket[]) => ({
        type: 'SET_PRODUCTS_TO_BASKET',
        productsInBasket,
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
    clearState: () => ({
        type: 'CLEAR_STATE',
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
