import { TasksStateType } from '../App';
import { v1 } from 'uuid';
import { AddTodoListAT, RemoveTodoListAT, todoListID_1, todoListID_2 } from './todolists-reducer';
type RemoveTasksAT = {
    type: "REMOVE-TASK"
    todoListID: string
    taskID: string
}
type AddTasksAT = {
    type: "ADD-TASK"
    title: string
    todoListID: string
}
type ChangeTaskStatusAT = {
    type: "CHANGE-TASK-STATUS"
    taskId: string
    isDone: boolean
    todoListID: string
}
type ChangeTaskTitleAT = {
    type: "CHANGE-TASK-TITLE"
    taskId: string
    newTitle: string
    todoListID: string
}

type ActionType = RemoveTasksAT | AddTasksAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT;

const initialState: TasksStateType = {
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
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = { ...state }
            const tasks = state[action.todoListID]
            const filteredTasks = tasks.filter(t => t.id !== action.taskID)
            stateCopy[action.todoListID] = filteredTasks
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = { ...state };
            const tasks = state[action.todoListID]
            const newTask = { id: v1(), title: action.title, isDone: false }
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todoListID] = newTasks
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            const stateCopy = { ...state };
            let tasks = stateCopy[action.todoListID]
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.isDone = action.isDone
            }
            return stateCopy
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = { ...state };
            let tasks = stateCopy[action.todoListID]
            let task = tasks.find(t => t.id === action.taskId);
            if (task) {
                task.title = action.newTitle
            }
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = { ...state };
            stateCopy[action.todoListID] = [];
            return stateCopy;
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = { ...state };
            delete stateCopy[action.todoListID]
            return stateCopy;
        }

        default:
            return state;
    }

}
export const removeTasksAC = (taskID: string, todoListID: string): RemoveTasksAT => {
    return { type: "REMOVE-TASK", todoListID, taskID }
}
export const addTasksAC = (title: string, todoListID: string): AddTasksAT => {
    return { type: "ADD-TASK", title, todoListID }
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return { type: "CHANGE-TASK-STATUS", taskId, isDone, todoListID }
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListID: string): ChangeTaskTitleAT => {
    return { type: "CHANGE-TASK-TITLE", taskId, newTitle, todoListID }
}