import {gql} from '@apollo/client';
import {Category} from '../../types/types';
import {updateProductWithoutFilesInput} from './products-mutation';

export type CreateCategoriesData = { createCategory: Category[] }

export type CreateCategoriesVars = { createCategoryInput: createCategoryInput }
type createCategoryInput = {
    isShown: boolean,
    name: string,
    description: string,
    products: updateProductWithoutFilesInput[]
}

export const CREATE_CATEGORIES_MUTATION = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
        createCategory(createCategoryInput: $createCategoryInput) {
            id
            isShown
            name
            slug
            description
        }
    }
`;

export type UpdateCategoriesData = { updateCategory: Category }

export type UpdateCategoriesVars = { updateCategoryInput: updateCategoryInput }
type updateCategoryInput = createCategoryInput & { id: number }

export const UPDATE_CATEGORIES_MUTATION = gql`
    mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
        updateCategory(updateCategoryInput: $updateCategoryInput) {
            id
            isShown
            name
            slug
            description
        }
    }
`;


export type RemoveCategoriesData = { removeCategory: boolean }
export type RemoveCategoriesVars = { id: number }

export const REMOVE_CATEGORIES_MUTATION = gql`
    mutation RemoveCategory($id: Int!) {
        removeCategory(id: $id)
    }
`;

