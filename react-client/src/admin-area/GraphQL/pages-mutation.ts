import {Page} from '../../types/types';
import {gql} from '@apollo/client';

// CREATE PAGE
export type CreatePageData = { createPage: Page }

export type CreatePageVars = { createPageInput: createPageInput }
export type createPageInput = {
    isShown: boolean,
    name: string,
    text: string,
}

export const CREATE_PAGE_MUTATION = gql`
    mutation CreatePage($createPageInput: CreatePageInput!){
        createPage(createPageInput: $createPageInput){
            id
            isShown
            name
            slug
            text
        }
    }
`;


// UPDATE PAGE
export type UpdatePageData = { updatePage: Page }

export type UpdatePageVars = { updatePageInput: updatePageInput }
export type updatePageInput = createPageInput & { id: number }

export const UPDATE_PAGE_MUTATION = gql`
    mutation UpdatePage($updatePageInput: UpdatePageInput!){
        updatePage(updatePageInput: $updatePageInput){
            id
            isShown
            name
            slug
            text
        }
    }
`;


// DELETE PAGE
export type RemovePageData = { removePage: boolean }
export type RemovePageVars = { id: number }

export const REMOVE_PAGE_MUTATION = gql`
    mutation RemovePage($id: Int!){
        removePage(id: $id)
    }
`;
