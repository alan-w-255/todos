import React from 'react';
import './App.css';
import ToDoList from './component/ToDoList';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from '@apollo/client';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache(),
});

function App() {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header className="App-header">
                    <ToDoList />
                </header>
            </div>
        </ApolloProvider>
    );
}

export default App;
