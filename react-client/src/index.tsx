import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter} from 'react-router-dom';
import store from './redux/redux-store';
import {Provider} from 'react-redux';
import {ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {baseURL} from './api/api';
import {schema} from './schema';
import {client} from './common-area/gql/client';



// const client = new ApolloClient({
//     //uri: '/graphql',
//     uri: baseURL + '/graphql',
//     cache: new InMemoryCache({addTypename: false}),
//     headers: {
//         authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : '',
//     },
//     defaultOptions: {
//         watchQuery: {
//             fetchPolicy: 'network-only',
//             errorPolicy: 'all',
//             notifyOnNetworkStatusChange: true,
//         },
//         query: {
//             fetchPolicy: 'network-only',
//             errorPolicy: 'all',
//             notifyOnNetworkStatusChange: true,
//         },
//     },
//     typeDefs: schema,
// });

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <ApolloProvider client={client}>
                    <App/>
                </ApolloProvider>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
