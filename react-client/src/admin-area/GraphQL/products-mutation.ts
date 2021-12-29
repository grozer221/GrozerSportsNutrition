import {gql} from '@apollo/client';
import {Characteristic, FileType, Product} from '../../types/types';
import {updateFileInput} from './files-mutation';

export type CreateProductData = { createProduct: Product[] }

export type CreateProductVars = { createProductInput: createProductInput }
type createProductInput = {
    isShown: boolean,
    name: string,
    quantity: number,
    priceUAH: number,
    description: string,
    files: FileType[],
}

export const CREATE_PRODUCT_MUTATION = gql`
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

export type UpdateProductData = { updateProduct: Product }

export type UpdateProductVars = { updateProductInput: updateProductInput }
export type updateProductInput = {
    id: number
    isShown: boolean,
    name: string,
    quantity: number,
    priceUAH: number,
    description: string,
    characteristics: Characteristic[]
    files: updateFileInput[],
}
export interface updateProductWithoutFilesInput extends Omit<updateProductInput, 'files'>{}

export const UPDATE_PRODUCT_MUTATION = gql`
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


export type RemoveProductData = { removeProduct: boolean }
export type RemoveProductVars = { id: number }

export const REMOVE_PRODUCT_MUTATION = gql`
    mutation RemoveProduct($id: Int!){
        removeProduct(id: $id)
    }
`;

