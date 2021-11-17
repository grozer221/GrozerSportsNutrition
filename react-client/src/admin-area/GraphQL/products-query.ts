import {gql} from '@apollo/client';
import {Product} from '../../types/types';

export type GetProductsData = { getProducts: Product[] }
export type GetProductsVars = { getProductsInput: getProductsInput }

type getProductsInput = { take: number, skip: number }

export const GET_PRODUCTS_QUERY = gql`
    query GetProducts($getProductsInput: GetProductsInput!){
        getProducts(getProductsInput: $getProductsInput){
            id
            name
        }
    }
`;

export type GetProductData = { getProduct: Product }
export type GetProductVars = { id: number }


export const GET_PRODUCT_QUERY = gql`
    query GetProduct($id: Int!){
        getProduct(id: $id){
            id
            name
        }
    }
`;

