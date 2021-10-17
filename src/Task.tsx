import React, { ChangeEvent, useCallback } from 'react';
import EditableSpan from "./EditableSpan";
import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { TaskType } from './Todolist';


type TaskPropsType = {
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    task: TaskType
    todoListID: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListID);
    }
    const changeTaskTitle = useCallback((title: string) => props.changeTaskTitle(props.task.id, title, props.todoListID), [props.changeTaskTitle, props.task.id, props.todoListID])
    return <li key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            onChange={onChangeHandler}
            checked={props.task.isDone}
        />
        <EditableSpan title={props.task.title} changeTitle={changeTaskTitle} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </li>
})