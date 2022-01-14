import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from '@apollo/client';
import {baseURL} from '../../admin-area/api/api';
import {schema} from '../../schema';
import {getAuthorizationHeader} from '../../utils/localStorageActions';

export const gqlLinks = {
    customer: 'graphqlCustomer',
    admin: 'graphqlAdmin',
};

const graphqlAdmin = new HttpLink({
    uri: baseURL + '/graphql-admin',
    headers: {
        authorization: getAuthorizationHeader(),
    },
});
const graphqlCustomer = new HttpLink({
    uri: baseURL + '/graphql-customer',
    headers: {
        authorization: getAuthorizationHeader(),
    },
});

export const client = new ApolloClient({
    link: ApolloLink.split(
        operation => operation.getContext().gqlLink === gqlLinks.customer,
        graphqlCustomer, //if above
        graphqlAdmin,
    ),
    cache: new InMemoryCache({addTypename: false}),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true,
        },
        query: {
            fetchPolicy: 'network-only',
            errorPolicy: 'all',
            notifyOnNetworkStatusChange: true,
        },
    },
    typeDefs: schema,
});
