import React, { useState, useEffect } from 'react';
import { Input } from 'antd';
import { gql, useQuery, useMutation } from '@apollo/client';
import ToDoItem, { ToDo, ToDoItemStatus } from './ToDoItem';

export const GET_TODOS = gql`
    query GetToDos {
        todos {
            id
            content
            status
        }
    }
`;

export const ADD_TODO = gql`
  mutation addToDo($content: String!) {
    addToDo(content: $content) {
      id
      content
      status
    }
  }
`;

export default function TodoList() {

    const [input, setInput] = useState('');
    const [todos, setTodos] = useState([] as ToDo[]);

    const [addToDo] = useMutation(ADD_TODO);

    const handleEnterNewTodo = (e: any) => {
        setInput('');
        addToDo({ variables: { content: e.target.value } }).then(({data}) => {
            setTodos([...todos, {
                id: data.addToDo.id,
                content: data.addToDo.content,
                status: data.addToDo.status,
            }]);
        }).catch(console.log);
    };

    const { loading, data } = useQuery(GET_TODOS);

    useEffect(() => {
        if(loading === false && data) {
            setTodos(data.todos);
        } 
    }, [loading, data]);

    const handleDeleteItem = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleCheck = (todo: ToDo, checked: boolean) => {
        const newToDo = {...todo};
        const t = todos.filter(item => todo.id !== item.id);
        newToDo.status = checked ? ToDoItemStatus.DONE : ToDoItemStatus.PENDING,
        t.push(newToDo);
        setTodos(t);
    };

    return (
        <div>
            { todos.map((todo: ToDo) => { 
                return <ToDoItem 
                    key={todo.id}
                    todo={todo}
                    onCheck={handleCheck}
                    onDelete={() => {handleDeleteItem(todo.id);}}  />; 

            })}
            <Input
                placeholder="Input ToDo"
                onPressEnter={handleEnterNewTodo}
                value={input}
                onChange={(e : any) => setInput(e.target.value)}
            />
        </div>
    );
}
