import {gql} from '@apollo/client';
import {Characteristic, Product} from '../../types/types';

export type CreateProductsData = { createProduct: Product[] }

export type CreateProductsVars = { createProductInput: createProductInput }
type createProductInput = {
    isShown: boolean,
    name: string,
    quantity: number,
    priceUAH: number,
    description: string,
    filesIds: number[],
}

export const CREATE_PRODUCTS_MUTATION = gql`
    mutation CreateProduct($createProductInput: CreateProductInput!){
        createProduct(createProductInput: $createProductInput){
            id
            name
            isShown
            quantity
            priceUAH
            description
            characteristics {
                name
                value
            }
            files {
                id
                fileImage
                filePath
                mimetype
                destination
                fileName
                size
                originalName
            }
        }
    }
`;

export type UpdateProductsData = { updateProduct: Product }

export type UpdateProductsVars = { updateProductInput: updateProductInput }
type updateProductInput = {
    id: number
    isShown: boolean,
    name: string,
    quantity: number,
    priceUAH: number,
    description: string,
    characteristics: Characteristic[]
    filesIds: number[],
}

export const UPDATE_PRODUCTS_MUTATION = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!){
        updateProduct(updateProductInput: $updateProductInput){
            id
            name
            isShown
            quantity
            priceUAH
            description
            characteristics {
                name
                value
            }
            files {
                id
                fileImage
                filePath
                mimetype
                destination
                fileName
                size
                originalName
            }
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

