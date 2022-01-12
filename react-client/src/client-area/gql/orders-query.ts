import {gql} from '@apollo/client';
import {Order} from '../../types/types';


export type GetMyOrdersData = { getMyOrders: getOrdersObject }
export type getOrdersObject = { orders: Order[], total: number }

export type GetMyOrdersVars = { getOrdersInput: getOrdersInput }
export type getOrdersInput = {
    take: number,
    skip: number,
}

export const GET_MY_ORDERS_QUERY = gql`
    query GetMyOrders($getOrdersInput: GetOrdersInput!) {
        getMyOrders(getOrdersInput: $getOrdersInput) {
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
            total
        }
    }
`;


export type GetMyOrderByIdData = { getMyOrderById: Order }
export type GetMyOrderByIdVars = { id: string }

export const GET_MY_ORDER_BY_ID_QUERY = gql`
    query GetMyOrderById($id: Int!) {
        getMyOrderById(id: $id) {
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
`;
