import {gql} from '@apollo/client';
import {Auth} from '../../types/types';

export type LoginData = { login: Auth }
export type LoginVars = { loginInput: loginInput }

type loginInput = { email: string, password: string }

export const LOGIN_MUTATION = gql`
    mutation Login($loginInput: LoginInput!){
        login(loginInput: $loginInput){
            accessToken
            user{
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
    }
`
