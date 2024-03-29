import {Order, ShippingMethod} from '../../types/types';
import {gql} from '@apollo/client';

export type CreateOrderData = { createOrder: Order }

export type CreateOrderVars = { createOrderInput: createOrderInput }
export type createOrderInput = {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
    deliveryCityName: string,
    deliveryCityCode: string,
    deliveryWarehouse: string,
    shippingMethod: ShippingMethod,
    createProductInOrder: CreateProductInOrderInput[]
}

export type CreateProductInOrderInput = {
    productId: number,
    productQuantity: number
}

export const CREATE_ORDER_MUTATION = gql`
    mutation CreateOrder($createOrderInput: CreateOrderInput!) {
        createOrder(createOrderInput: $createOrderInput) {
            id
            email
            firstName
            lastName
            phoneNumber
            address
            deliveryCityName
            deliveryCityCode
            deliveryWarehouse
            shippingMethod
            orderStatus
            user {
                id
                confirmedEmail
                email
                firstName
                lastName
            }
            productsInOrder {
                productQuantity
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
            }
        }
    }
`;


export type CancelOrderData = { cancelOrder: Order }
export type CancelOrderVars = { id: number }

export const CANCEL_ORDER_MUTATION = gql`
    mutation CancelOrder($id: Int!) {
        cancelOrder(id: $id) {
            id
            email
            firstName
            lastName
            phoneNumber
            address
            deliveryCityName
            deliveryCityCode
            deliveryWarehouse
            shippingMethod
            orderStatus
            user {
                id
                confirmedEmail
                email
                firstName
                lastName
            }
            productsInOrder {
                productQuantity
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
            }
        }
    }
`;
