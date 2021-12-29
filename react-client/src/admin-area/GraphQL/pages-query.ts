import {gql} from '@apollo/client';
import {Page} from '../../types/types';

export type GetPagesData = { getPages: Page[] }
export type GetPagesVars = {}

export const GET_PAGES_QUERY = gql`
    query GetPages {
        getPages {
            id
            isShown
            name
            slug
            text
        }
    }

`;


export type GetPageData = { getPage: Page }
export type GetPageVars = { id: number }

export const GET_PAGE_QUERY = gql`
    query GetPage($id: Int!) {
        getPage(id: $id) {
            id
            isShown
            name
            slug
            text
        }
    }

`;
