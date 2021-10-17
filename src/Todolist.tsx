import React, { useCallback } from 'react';
import { FilterValuesType } from './App';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Task } from './Task';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (value: FilterValuesType, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListID: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListID: string) => void
    removeTask: (taskId: string, todoListID: string) => void
    filter: FilterValuesType
    removeTodoList: (todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {
    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);
    const removeTodoList = () => {
        props.removeTodoList(props.id);
    }
    const changeTodoListTitle = useCallback((title: string) => props.changeTodoListTitle(title, props.id), [props.changeTodoListTitle, props.id])
    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])



    const tasks = props.tasks.map(t => <Task
        task={t}
        changeTaskStatus={props.changeTaskStatus}
        changeTaskTitle={props.changeTaskTitle}
        removeTask={props.removeTask}
        todoListID={props.id}
        key={t.id}
    />)


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
})

