import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

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
        {id: todoListID_1, title: "What to learn", filter: "all"},
        {id: todoListID_2, title: "What to buy", filter: "all"},

    ])

    let removeTodoList = (todoListID: string) => {
        let filteredTodolist= todoLists.filter(tl=>tl.id !== todoListID)
        setTodoLists(filteredTodolist);
        delete tasksObj[todoListID];
        setTasks(tasksObj);
    }
    let [tasksObj, setTasks] = useState({
        [todoListID_1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]

    })


    function removeTask(id: string, todoListID: string) {
        let tasks = tasksObj[todoListID];
        let filteredTasks = tasks.filter(t => t.id != id);
        tasksObj[todoListID] = filteredTasks;
        setTasks({...tasksObj})
    }

    function addTask(title: string, todoListID: string) {
        let task = {id: v1(), title: title, isDone: false};
        let tasks = tasksObj[todoListID]
        const newTasks = [task, ...tasks]
        tasksObj[todoListID] = newTasks;
        setTasks({...tasksObj});
    }

    function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
        let tasks = tasksObj[todoListID]
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;

            setTasks({...tasksObj})
        }

        ;
    }


    function changeFilter(value: FilterValuesType, todoListID: string) {
        let todoList = todoLists.find(tl => tl.id === todoListID);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists])
        }
    }


    return (
        <div className="App">
            {
                todoLists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id];

                    if (tl.filter === "active") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                    }
                    if (tl.filter === "completed") {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                    }

                    return <Todolist
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
                    />


                })
            }
        </div>
    );
}

export default App;
