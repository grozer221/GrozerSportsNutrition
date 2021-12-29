import {gql} from '@apollo/client';
import {Category} from '../../types/types';
import {updateProductWithoutFilesInput} from './products-mutation';

export type CreateCategoryData = { createCategory: Category[] }

export type CreateCategoryVars = { createCategoryInput: createCategoryInput }
type createCategoryInput = {
    isShown: boolean,
    name: string,
    description: string,
    products: updateProductWithoutFilesInput[]
}

export const CREATE_CATEGORY_MUTATION = gql`
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

export type UpdateCategoryData = { updateCategory: Category }

export type UpdateCategoryVars = { updateCategoryInput: updateCategoryInput }
type updateCategoryInput = createCategoryInput & { id: number }

export const UPDATE_CATEGORY_MUTATION = gql`
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


export type RemoveCategoryData = { removeCategory: boolean }
export type RemoveCategoryVars = { id: number }

export const REMOVE_CATEGORY_MUTATION = gql`
    mutation RemoveCategory($id: Int!) {
        removeCategory(id: $id)
    }
`;

