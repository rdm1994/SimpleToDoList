import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';
import AddItemForm from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Toolbar, Paper, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType

}

function App() {
    //BLL
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListID_1, title: "What to learn", filter: "all" },
        { id: todoListID_2, title: "What to buy", filter: "all" },

    ])
    const [tasksObj, setTasks] = useState({
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
        let tasks = tasksObj[todoListID];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todoListID] = filteredTasks;
        setTasks({ ...tasksObj })
    }

    function addTask(title: string, todoListID: string) {
        let task = { id: v1(), title: title, isDone: false };
        let tasks = tasksObj[todoListID]
        const newTasks = [task, ...tasks]
        tasksObj[todoListID] = newTasks;
        setTasks({ ...tasksObj });
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;

            setTasks({ ...tasksObj })
        }
    }

    function changeTaskTitle(taskId: string, newTitle: string, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.title = newTitle;

            setTasks({ ...tasksObj })
        }

    }


    function changeFilter(value: FilterValuesType, todoListID: string) {
        const todoList = todoLists.map(tl => tl.id === todoListID ? { ...tl, filter: value } : tl)
        setTodoLists(todoList)
    }
    function removeTodoList(todoListID: string) {
        const filteredTodolist = todoLists.filter(tl => tl.id !== todoListID)
        setTodoLists(filteredTodolist);
        delete tasksObj[todoListID];
        setTasks(tasksObj);
    }
    function addTodoList(title: string) {
        const newTodoListID = v1()
        const newTodoList: TodoListType = {
            id: newTodoListID, title, filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({ ...tasksObj, [newTodoListID]: [] })
    }
    function changeTodoListTitle(title: string, todoListID: string) {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? { ...tl, title: title } : tl)
        setTodoLists(updatedTodoLists)
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
