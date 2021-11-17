import {gql} from '@apollo/client';
import {Product} from '../../types/types';

export type CreateProductData = { createProduct: Product[] }
export type CreateProductVars = { createProductInput: createProductInput }

type createProductInput = { name: string }

export const CREATE_PRODUCT_MUTATION = gql`
    mutation CreateProduct($createProductInput: CreateProductInput!){
        createProduct(createProductInput: $createProductInput){
            id
            name
        }
    }
`;

export type ProductUpdateData = { updateProduct: Product }
export type ProductUpdateVars = { updateProductInput: Product }

export const PRODUCT_UPDATE_MUTATION = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!){
        updateProduct(updateProductInput: $updateProductInput){
            id
            name
        }
    }
`;


export type ProductRemoveData = { removeProduct: boolean }
export type ProductRemoveVars = { id: number }

export const PRODUCT_REMOVE_MUTATION = gql`
    mutation RemoveProduct($id: Int!){
        removeProduct(id: $id)
    }
`;

