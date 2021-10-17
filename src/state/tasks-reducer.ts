import {TasksStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';

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

type ActionType =
    RemoveTasksAT
    | AddTasksAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT;

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = state[action.todoListID]
            stateCopy[action.todoListID] = tasks.filter(t => t.id !== action.taskID)
            return stateCopy
        }
        case "ADD-TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todoListID]
            const newTask = {id: v1(), title: action.title, isDone: false}
            stateCopy[action.todoListID] = [newTask, ...tasks]
            return stateCopy
        }
        case "CHANGE-TASK-STATUS": {
            let todoListTasks = state[action.todoListID]
            state[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t
                );
            return {...state}
        }
        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state};
            let todoListTasks = stateCopy[action.todoListID]
            stateCopy[action.todoListID] = todoListTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.newTitle}
                    : t
                );
            return stateCopy
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todoListID] = [];
            return stateCopy;
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.todoListID]
            return stateCopy;
        }

        default:
            return state;
    }

}
export const removeTasksAC = (taskID: string, todoListID: string): RemoveTasksAT => {
    return {type: "REMOVE-TASK", todoListID, taskID}
}
export const addTasksAC = (title: string, todoListID: string): AddTasksAT => {
    return {type: "ADD-TASK", title, todoListID}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todoListID: string): ChangeTaskStatusAT => {
    return {type: "CHANGE-TASK-STATUS", taskId, isDone, todoListID}
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todoListID: string): ChangeTaskTitleAT => {
    return {type: "CHANGE-TASK-TITLE", taskId, newTitle, todoListID}
}