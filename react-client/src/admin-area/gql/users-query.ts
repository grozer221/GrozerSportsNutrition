import {gql} from '@apollo/client';
import {User} from '../../types/types';

export type GetUsersData = { getUsers: getUsers }
export type getUsers = { users: User[], total: number }

export type GetUsersVars = { getUsersInput: getUsersInput }
export type getUsersInput = { take: number, skip: number }

export const GET_USERS_QUERY = gql`
    query GetUsers($getUsersInput: GetUsersInput!){
        getUsers(getUsersInput: $getUsersInput){
            users {
                id
                email
                firstName
                lastName
                roles {
                    id
                    name
                    color
                }
            }
            total
        }
    }
`;


export type GetUserData = { getUser: User }

export type GetUserVars = { email: string }

export const GET_USER_QUERY = gql`
    query GetUser($email: String!){
        getUser(email: $email) {
            id
            email
            firstName
            lastName
            roles {
                id
                name
                color
            }
        }
    }

`;
