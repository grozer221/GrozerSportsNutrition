import {gql} from '@apollo/client';
import {OrderBy, Product} from '../../types/types';

export type GetProductsData = { getProducts: getProductsObject }
export type getProductsObject = { products: Product[], total: number }

export type GetProductsVars = { getProductsInput: getProductsInput }
export type getProductsInput = {
    take: number,
    skip: number,
    likeName: string,
    orderBy: OrderBy,
}

export const GET_PRODUCTS_QUERY = gql`
    query GetProducts($getProductsInput: GetProductsInput!) {
        getProducts(getProductsInput: $getProductsInput) {
            products {
                id
                name
                slug
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
                categories {
                    id
                    isShown
                    name
                    description
                    slug
                }
            }
            total
        }
    }
`;

export type GetProductData = { getProduct: Product }
export type GetProductVars = { slug: string }


export const GET_PRODUCT_QUERY = gql`
    query GetProduct($slug: String!){
        getProduct(slug: $slug){
            id
            name
            slug
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
            categories {
                id
                isShown
                name
                description
                slug
            }
        }
    }
`;


export type GetProductByNameData = { getProductByName: Product }
export type GetProductByNameVars = { name: string }

export const GET_PRODUCT_BY_NAME_QUERY = gql`
    query GetProductByName($name: String!) {
        getProductByName(name: $name) {
            id
            isShown
            name
            slug
            quantity
            priceUAH
            description
            characteristics {
                name
                value
            }
            files {
                id
                originalName
                mimetype
                destination
                fileName
                filePath
                fileImage
                size
            }
            categories {
                id
                isShown
                name
                description
                slug
            }
        }
    }
`;
