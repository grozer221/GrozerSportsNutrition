import {FileType, ShippingMethod} from '../../types/types';
import {gql} from '@apollo/client';

export type CreateFileData = { createFile: FileType }

export type CreateOrderVars = { createOrderInput: createOrderInput }
export type createOrderInput = {
    email: string,
    firstName: string,
    lastName: string,
    phoneNumber: string,
    address: string,
    shippingMethod: ShippingMethod,
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
            user {
                id
                confirmedEmail
                email
                firstName
                lastName
            }
        }
    }

`;
