import React, { useState, useEffect } from 'react';
import { Checkbox, Input } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';

export enum ToDoItemStatus {
    DONE = 'DONE',
    PENDING = 'PENDING',
    ARCHIVED = 'ARCHIVED',
}

export type ToDo = {
    id: number,
    content: string,
    status: ToDoItemStatus
}

export const DELETE_TODO = gql`
    mutation deleteToDo($id: ID!) {
        deleteToDo(id: $id)
    }
`;

export const UPDATE_TODO_STATUS = gql`
    mutation updateToDoStatus($id: ID!, $status: ToDoStatus) {
        setToDoStatus(id: $id, status: $status)
    }
`;

export const UPDATE_TODO_CONTENT = gql`
    mutation updateToDoContent($id: ID!, $content: String) {
        updateToDo(id: $id, content: $content)
    }
`;

export default function ToDoItem(props: any) {
    const [deleteToDo] = useMutation(DELETE_TODO);
    const [updateToDoStatus] = useMutation(UPDATE_TODO_STATUS);
    const [updateToDoContent] = useMutation(UPDATE_TODO_CONTENT);

    const [isMouseHover, setIsMouseHover] = useState(false);
    const [isEditContent, setIsEditContent] = useState(false);
    const [todoContent, setEditContent] = useState(props.todo.content);
    let editInput : any;

    const focusEditInput = () => {
        editInput.focus();
    };

    const deleteTodo = () => {
        deleteToDo({variables: { id: props.todo.id }});
        props.onDelete();
    };

    const handleCheckboxChange = (e: any) => {
        updateToDoStatus({ variables: {id: props.todo.id, status: e.target.checked ? ToDoItemStatus.DONE : ToDoItemStatus.PENDING} });
        props.onCheck(props.todo, e.target.checked);
    };

    const handleMouseOver = ()=> {
        setIsMouseHover(true);
    };

    const handleMouseOut = () => {
        setIsMouseHover(false);
    };

    const handleClickOnText = () => {
        setIsEditContent(!isEditContent);
    };
    
    const handleEditInputBlur = () => {
        setIsEditContent(false);
    };

    const handlePressEnter = () => {
        updateToDoContent({ variables: { id: props.todo.id, content: todoContent } });
        setIsEditContent(false);
    };

    useEffect(() => {
        if (isEditContent && editInput) {
            focusEditInput();
        }
    }, [editInput, isEditContent]);

    return (
        <div className="Item" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
            <Checkbox 
                checked={props.todo.status === ToDoItemStatus.DONE}
                onChange={handleCheckboxChange}>
            </Checkbox>
            { !isEditContent &&
                <span 
                    className="ToDoContent"
                    onClick={handleClickOnText}
                    style={{ textDecoration: props.todo.status === 'DONE' ? 'line-through' : 'none' }}>
                    {todoContent} 
                </span>
            }
            { isEditContent && <Input
                value={ todoContent }
                bordered={false}
                ref={(input) => { editInput = input; }}
                onPressEnter={handlePressEnter}
                onChange={(e) => { setEditContent(e.target.value); }}
                onBlur={handleEditInputBlur}/> }
            <DeleteOutlined style={{visibility: isMouseHover ? 'visible' : 'hidden'}} onClick={deleteTodo} className="DeleteIcon" />
        </div>
    );
}
