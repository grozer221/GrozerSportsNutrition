import {gql} from '@apollo/client';
import {Product, RoleName} from '../../types/types';

export type UpdateUserData = { updateUser: Product }

export type UpdateUserVars = { updateUserInput: updateUserInput }
export type updateUserInput = {
    id: number,
    email: string,
    firstName: string,
    lastName: string,
    roles: updateRoleInput[],
}

export type updateRoleInput = {
    id: number;
    name: RoleName;
}

export const UPDATE_USER_MUTATION = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!){
        updateUser(updateUserInput: $updateUserInput){
            id
            confirmedEmail
            email
            firstName
            lastName
            roles{
                id
                name
                color
            }
        }
    }
`;


export type RemoveUserData = { removeUser: boolean }
export type RemoveUserVars = { email: string }

export const REMOVE_USER_MUTATION = gql`
    mutation RemoveProduct($email: String!){
        removeUser(email: $email)
    }
`;

