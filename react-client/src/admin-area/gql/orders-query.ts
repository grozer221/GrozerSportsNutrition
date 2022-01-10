import {gql} from '@apollo/client';
import {Order} from '../../types/types';

export type GetOrdersData = { getOrders: getOrders }
export type getOrders = {
    orders: Order[],
    total: number
}

export type GetOrdersVars = { getOrdersInput: getOrdersInput }
export type getOrdersInput = {
    take: number,
    skip: number,
}

export const GET_ORDERS_QUERY = gql`
    query GetOrders($getOrdersInput: GetOrdersInput!) {
        getOrders(getOrdersInput: $getOrdersInput) {
            orders {
                id
                email
                firstName
                lastName
                phoneNumber
                address
                shippingMethod
                orderStatus
                totalPrice
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


export type GetOrderData = { getOrder: Order }
export type GetOrderVars = { id: number }

export const GET_ORDER_QUERY = gql`
    query GetOrder($id: Int!) {
        getOrder(id: $id) {
            id
            email
            firstName
            lastName
            phoneNumber
            address
            shippingMethod
            orderStatus
            totalPrice
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
