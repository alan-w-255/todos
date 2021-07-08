import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { MockedProvider } from '@apollo/client/testing';
import ToDoItem, { ToDoItemStatus } from './ToDoItem';

const mocks = [];

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
    const fakeToDo = {
        id: 1,
        content: 'hi',
        status: ToDoItem.status,
    };

    await act(async () => {
        render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <ToDoItem todo={fakeToDo} />
            </MockedProvider>, container);
    });

    // expect(container).toBe('');
    expect(container.querySelector('span.ToDoContent').textContent).toBe(fakeToDo.content);
});
