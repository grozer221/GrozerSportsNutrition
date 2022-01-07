import {gql} from '@apollo/client';
import {Category} from '../../types/types';

export type GetCategoriesData = { getCategories: getCategoriesObject }
export type getCategoriesObject = { categories: Category[], total: number }

export type GetCategoriesVars = { getCategoriesInput: getCategoriesInput }
export type getCategoriesInput = {
    take: number,
    skip: number,
}

export const GET_CATEGORIES_QUERY = gql`
    query GetCategories($getCategoriesInput: GetCategoriesInput!) {
        getCategories(getCategoriesInput: $getCategoriesInput) {
            categories {
                id
                isShown
                name
                slug
                description
                products {
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
                }
            }
            total
        }
    }

`;


export type GetCategoryData = { getCategory: Category }
export type GetCategoryVars = { slug: string }

export const GET_CATEGORY_QUERY = gql`
    query GetCategory($slug: String!) {
        getCategory(slug: $slug) {
            id
            isShown
            name
            slug
            description
            products {
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
            }
        }
    }
`;


export type GetCategoryByNameData = { getCategoryByName: Category }
export type GetCategoryByNameVars = { name: string }

export const GET_CATEGORY_BY_NAME_QUERY = gql`
    query GetCategoryByName($name: String!){
        getCategoryByName(name: $name){
            id
            isShown
            name
            slug
            description
            products {
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
            }
        }
    }
`;
