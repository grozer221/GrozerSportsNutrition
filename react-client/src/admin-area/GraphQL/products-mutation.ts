import {gql} from '@apollo/client';
import {Product} from '../../types/types';

export type CreateProductsData = { createProduct: Product[] }

export type CreateProductsVars = { createProductInput: createProductInput }
type createProductInput = { name: string }

export const CREATE_PRODUCTS_MUTATION = gql`
    mutation CreateProduct($createProductInput: CreateProductInput!){
        createProduct(createProductInput: $createProductInput){
            id
            name
            isShown
        }
    }
`;

export type UpdateProductsData = { updateProduct: Product }
export type UpdateProductsVars = { updateProductInput: Product }

export const UPDATE_PRODUCTS_MUTATION = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!){
        updateProduct(updateProductInput: $updateProductInput){
            id
            name
            isShown
        }
    }
`;


export type RemoveProductsData = { removeProduct: boolean }
export type RemoveProductsVars = { id: number }

export const REMOVE_PRODUCTS_MUTATION = gql`
    mutation RemoveProduct($id: Int!){
        removeProduct(id: $id)
    }
`;

