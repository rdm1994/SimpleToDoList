import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todoListID: string) => void
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export function Todolist(props: PropsType) {

    const onAllClickHandler = () => props.changeFilter("all", props.id);
    const onActiveClickHandler = () => props.changeFilter("active", props.id);
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.id)
    const addTask = (title: string) => props.addTask(title, props.id)
    const tasks = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
        }
        const changeTaskTitle = (title: string) => props.changeTaskTitle(t.id, title, props.id)
        return <li key={t.id} className={t.isDone ? "is-done" : ""}>
            <Checkbox
                color={"primary"}
                onChange={onChangeHandler}
                checked={t.isDone}
            />
            <EditableSpan title={t.title} changeTitle={changeTaskTitle} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </li>
    })

    return <div>
        <h3>
            <EditableSpan title={props.title} changeTitle={changeTodoListTitle} />
            <IconButton onClick={removeTodoList}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <ul style={{ listStyle: "none", padding: "0px" }}>
            {tasks}
        </ul>
        <div>
            <Button
                style={{ marginRight: "5px" }}
                size={"small"}
                color={"primary"}
                variant={props.filter === 'all' ? "outlined" : "contained"}
                className={props.filter === 'all' ? "active-filter" : ""}
                onClick={onAllClickHandler}>All
            </Button>
            <Button
                style={{ marginRight: "5px" }}
                size={"small"}
                color={"primary"}
                variant={props.filter === 'active' ? "outlined" : "contained"}
                className={props.filter === 'active' ? "active-filter" : ""}
                onClick={onActiveClickHandler}>Active
            </Button>
            <Button
                style={{ marginRight: "5px" }}
                size={"small"}
                color={"primary"}
                variant={props.filter === 'completed' ? "outlined" : "contained"}
                className={props.filter === 'completed' ? "active-filter" : ""}
                onClick={onCompletedClickHandler}>Completed
            </Button>

        </div>
    </div>
}
