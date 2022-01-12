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

export type UpdateMeData = { updateMe: Auth }

export type UpdateMeVars = { updateMeInput: updateMeInput }
export type updateMeInput = { firstName: string, lastName: string }

export const UPDATE_ME_MUTATION = gql`
    mutation UpdateMe($updateMeInput: UpdateMeInput!) {
        updateMe(updateMeInput: $updateMeInput) {
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


export type UpdateEmailData = { updateEmail: string }
export type UpdateEmailVars = { updateEmailInput: { email: string } }

export const UPDATE_EMAIL_MUTATION = gql`
    mutation UpdateMe($updateEmailInput: UpdateEmailInput!) {
        updateEmail(updateEmailInput: $updateEmailInput)
    }
`;


export type UpdatePasswordData = { updatePassword: Auth }
export type UpdatePasswordVars = { updatePasswordInput: updatePasswordInput }
export type updatePasswordInput = {
    oldPassword: string,
    newPassword: string
}

export const UPDATE_PASSWORD_MUTATION = gql`
    mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {
        updatePassword(updatePasswordInput: $updatePasswordInput) {
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
