import {gql} from '@apollo/client';
import {User} from '../../types/types';

export type GetUsersData = { getUsers: User[] }
export type GetUsersVars = { getUsersInput: getUsersInput }

type getUsersInput = { take: number, skip: number }

export const GET_USERS_QUERY = gql`
    query GetUsers($getUsersInput: GetUsersInput!){
        getUsers(getUsersInput: $getUsersInput){
            id
            email
            firstName
            lastName
            roles{
                id
                name
            }
        }
    }
`
