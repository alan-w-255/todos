import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import ToDoList, { GET_TODOS } from './ToDoList';

const mock = {
    request: {
        query: GET_TODOS,
    },
    result: {
        data: {
            todos: [{ id: '1', content: 'hi', status: 'PENDING' }],
        },
    },
};

let container = null;

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it('render ToDo Item', async () => {
    await act(async () => {
        render(
            <MockedProvider mocks={[mock]} addTypename={false}>
                <ToDoList/>
            </MockedProvider>, container);
        await new Promise(resolve => {setTimeout(resolve, 0);});
    });


    expect(container.querySelector('span.ToDoContent').textContent).toBe(mock.result.data.todos[0].content);
    expect(container.querySelector('input')).not.toBeNull();
});
