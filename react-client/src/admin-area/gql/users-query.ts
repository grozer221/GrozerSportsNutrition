import {gql} from '@apollo/client';
import {User} from '../../types/types';

export type GetUsersData = { getUsers: getUsers }
export type getUsers = { users: User[], total: number }

export type GetUsersVars = { getUsersInput: getUsersInput }
export type getUsersInput = {
    take: number,
    skip: number,
    like: string,
}

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
            orders {
                id
                email
                firstName
                lastName
                phoneNumber
                address
                deliveryCityCode
                deliveryCityName
                deliveryWarehouse
                shippingMethod
                orderStatus
                totalPrice
                createdAt
                updatedAt
                user {
                    id
                    email
                    firstName
                    lastName
                    roles {
                        id
                        name
                    }
                }
                productsInOrder {
                    product {
                        id
                        name
                        slug
                        isShown
                        quantity
                        priceUAH
                        description
                        characteristics {
                            name
                            value
                        }
                        files {
                            id
                            fileImage
                            filePath
                            mimetype
                            destination
                            fileName
                            size
                            originalName
                        }
                        categories {
                            id
                            isShown
                            name
                            description
                            slug
                        }
                    }
                    productQuantity
                }
            }
        }
    }

`;
