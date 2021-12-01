import React from 'react';
import ReactDOM from 'react-dom';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import store from "./redux/redux-store";
import {Provider} from 'react-redux';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";

const client = new ApolloClient({
    uri: '/graphql',
    credentials: 'include',
    cache: new InMemoryCache(),
    headers: {
        authorization: localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}` : "",
    },
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    }
});

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
    document.getElementById('root')
);
