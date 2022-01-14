import {gql} from '@apollo/client';
import {Role, User} from '../../types/types';

export type GetRolesData = { getRoles: Role[] }

export type GetRolesVars = { }

export const GET_ROLES_QUERY = gql`
    query GetRoles {
        getRoles {
            id
            name
            color
        }
    }

`;
