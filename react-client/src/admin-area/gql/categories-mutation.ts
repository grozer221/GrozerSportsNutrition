import {gql} from '@apollo/client';
import {Category} from '../../types/types';

export type CreateCategoryData = { createCategory: Category }

export type CreateCategoryVars = { createCategoryInput: createCategoryInput }
export type createCategoryInput = {
    isShown: boolean,
    name: string,
    description: string,
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
export type updateCategoryInput = createCategoryInput & { id: number }

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
export type RemoveCategoryVars = { slug: string }

export const REMOVE_CATEGORY_MUTATION = gql`
    mutation RemoveCategory($slug: String!) {
        removeCategory(slug: $slug)
    }
`;

