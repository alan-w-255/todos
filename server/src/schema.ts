import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Query {
        todo(id: ID): ToDo 
        todos: [ToDo]
    }

    type Mutation {
        addToDo(content: String): ToDo
        updateToDo(id: ID, content: String): Int
        setToDoStatus(id: ID, status: ToDoStatus): Int 
        deleteToDo(id: ID): Int
    }

    type ToDo {
        id: ID!
        content: String
        status: ToDoStatus
    }
    
    enum ToDoStatus {
        PENDING
        DONE
        ARCHIVED
    }
`;
