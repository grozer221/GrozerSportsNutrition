import {gql} from '@apollo/client';
import {Auth, User} from '../../types/types';

export type MeData = { me: Auth }
export type MeVars = {}


export const ME_QUERY = gql`
    query Me {
        me {
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
            accessToken
        }
    }

`
