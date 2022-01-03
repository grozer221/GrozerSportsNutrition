import {gql} from '@apollo/client';
import {OrderByType, Page} from '../../types/types';

export type GetPagesData = { getPages: Page[] }
export type GetPagesVars = {
    getPagesInput: {
        orderBy: GetPagesOrderBy,
        orderByType: OrderByType,
        isShown: boolean,
    }
}
export type GetPagesOrderBy = 'sorting';

export const GET_PAGES_QUERY = gql`
    query GetPages($getPagesInput: GetPagesInput!) {
        getPages(getPagesInput: $getPagesInput) {
            id
            isShown
            name
            slug
            text
            sorting
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
            sorting
        }
    }
`;
