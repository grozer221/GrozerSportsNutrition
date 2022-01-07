import {gql} from '@apollo/client';
import {Auth} from '../../types/types';

export type LoginData = { login: Auth }
export type LoginVars = { loginInput: loginInput }

type loginInput = { email: string, password: string }

export const LOGIN_MUTATION = gql`
    mutation Login($loginInput: LoginInput!){
        login(loginInput: $loginInput){
            accessToken
            user {
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
    }
`;

export type ConfirmationEmailData = { confirmationEmail: Auth }
export type ConfirmationEmailVars = { token: string }

export const CONFIRMATION_EMAIL_MUTATION = gql`
    mutation ConfirmationEmail($token: String!) {
        confirmationEmail(token: $token) {
            accessToken
            user {
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
    }
`;

export type RegisterData = { register: string }
export type RegisterVars = { registerInput: registerInput }
export type registerInput = {
    email: string,
    password: string,
    firstName: string,
    lastName: string,
}

export const REGISTER_MUTATION = gql`
    mutation Register($registerInput: RegisterInput!) {
        register(registerInput: $registerInput)
    }
`;
