import React, {useCallback} from 'react';
import {Todolist, TaskType} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Toolbar, Paper, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    removeTodoListAC,
    addTodoListAC,
    changeTodoListTitleAC,
    changeTodoListFilterAC
} from './state/todolists-reducer';
import {removeTasksAC, addTasksAC, changeTaskStatusAC, changeTaskTitleAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootState} from './state/store';

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

    const dispatch = useDispatch()
    const todoLists = useSelector<AppRootState, Array<TodoListType>>(state => state.todoLists)
    const tasksObj = useSelector<AppRootState, TasksStateType>(state => state.tasks)


    const removeTask = useCallback((id: string, todoListID: string) => {
        dispatch(removeTasksAC(id, todoListID))
    }, [dispatch])

    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTasksAC(title, todoListID))
    }, [dispatch])

    const changeStatus = useCallback((taskId: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC(taskId, isDone, todoListID))
    }, [dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListID))
    }, [dispatch])


    const changeFilter = useCallback((value: FilterValuesType, todoListID: string) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }, [dispatch])
    const removeTodoList = useCallback((todoListID: string) => {
        dispatch(removeTodoListAC(todoListID))
    }, [dispatch])
    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListAC(title))
    }, [dispatch]);
    const changeTodoListTitle = useCallback((title: string, todoListID: string) => {
        dispatch(changeTodoListTitleAC(title, todoListID))
    }, [dispatch])
    //UI:
    const todoListComponents =
        todoLists.map((tl) => {
            let allTodoListTasks = tasksObj[tl.id];
            let tasksForTodolist = allTodoListTasks;


            if (tl.filter === "active") {
                tasksForTodolist = allTodoListTasks.filter(t => t.isDone === false);
            }
            if (tl.filter === "completed") {
                tasksForTodolist = allTodoListTasks.filter(t => t.isDone === true);
            }
            return (
                <Grid item>
                    <Paper elevation={5} style={{padding: "20px"}}>
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
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        TODO lists
                    </Typography>
                    <Button variant="outlined" color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container={true} style={{padding: "20px 0px"}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container={true} spacing={5}>
                    {todoListComponents}
                </Grid>
            </Container>

        </div>
    );
}

export default App;
