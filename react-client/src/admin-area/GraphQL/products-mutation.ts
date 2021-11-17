import {gql} from '@apollo/client';
import {Product} from '../../types/types';

export type CreateProductData = { createProduct: Product[] }
export type CreateProductVars = { createProductInput: createProductInput }

type createProductInput = { name: string }

export const CREATE_PRODUCT_QUERY = gql`
    mutation CreateProduct($createProductInput: CreateProductInput!){
        createProduct(createProductInput: $createProductInput){
            id
            name
        }
    }
`

