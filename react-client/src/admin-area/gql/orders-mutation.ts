import {Order, OrderStatus, ShippingMethod} from '../../types/types';
import {gql} from '@apollo/client';

// CREATE ORDER
export type CreateOrderData = { createOrder: Order }

export type CreateOrderVars = { createOrderInput: createOrderInput }
export type createOrderInput = {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
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
            shippingMethod
            orderStatus
            totalPrice
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


// UPDATE ORDER
export type UpdateOrderData = { updateOrder: Order }

export type UpdateOrderVars = { updatePageInput: updateOrderInput }
export type updateOrderInput = createOrderInput & { id: number, orderStatus: OrderStatus }

export const UPDATE_PAGE_MUTATION = gql`
    mutation UpdateOrder($updateOrderInput: UpdateOrderInput!) {
        updateOrder(updateOrderInput: $updateOrderInput) {
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

// DELETE ORDERS
export type RemoveOrderData = { removeOrder: boolean }
export type RemoveOrderVars = { id: number }

export const REMOVE_ORDER_MUTATION = gql`
    mutation RemoveOrder($id: Int!) {
        removeOrder(id: $id)
    }

`;
