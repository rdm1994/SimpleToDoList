import React, { useState } from 'react';
import './App.css';
import { Todolist, TaskType } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Toolbar, Paper, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { useReducer } from 'react-transition-group/node_modules/@types/react';
import { todoListsReducer, removeTodoListAC, addTodoListAC, changeTodoListTitleAC, changeTodoListFilterAC } from './state/todolists-reducer';
import { tasksReducer, removeTasksAC, addTasksAC, changeTaskStatusAC, changeTaskTitleAC } from './state/tasks-reducer';

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" },

    ])
    const [tasksObj, dispatchToTasksReducer] = useReducer(tasksReducer, {
        [todoListID_1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
        ],
        [todoListID_2]: [
            { id: v1(), title: "Milk", isDone: false },
            { id: v1(), title: "Apple", isDone: false },
            { id: v1(), title: "Chips", isDone: false },
        ]
    })



    function removeTask(id: string, todoListID: string) {
        dispatchToTasksReducer(removeTasksAC(id, todoListID))
    }

    function addTask(title: string, todoListID: string) {
        dispatchToTasksReducer(addTasksAC(title, todoListID))
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        dispatchToTasksReducer(changeTaskStatusAC(taskId, isDone, todoListID))
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        dispatchToTasksReducer(changeTaskTitleAC(taskId, newTitle, todoListID))
    }


    function changeFilter(value: FilterValuesType, todoListID: string) {
        dispatchToTodolistsReducer(changeTodoListFilterAC(todoListID, value))
    }
    function removeTodoList(todoListID: string) {
        dispatchToTodolistsReducer(removeTodoListAC(todoListID))
        dispatchToTasksReducer(removeTodoListAC(todoListID))
    }
    function addTodoList(title: string) {
        dispatchToTodolistsReducer(addTodoListAC(title))
        dispatchToTasksReducer(addTodoListAC(title))
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        dispatchToTodolistsReducer(changeTodoListTitleAC(title, todoListID))
    }
    //UI:
    const todoListComponents = todoLists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];

        if (tl.filter === "active") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
        }
        if (tl.filter === "completed") {
            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
        }

        return (
            <Grid item>
                <Paper elevation={5} style={{ padding: "20px" }}>
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>
        )


    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton edge="start" color="inherit" aria-label="menu" >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        TODO lists
                    </Typography>
                    <Button variant="outlined" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{ padding: "20px 0px" }}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
