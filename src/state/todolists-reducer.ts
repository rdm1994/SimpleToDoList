import { TodoListType, FilterValuesType } from '../App';
import { v1 } from 'uuid';

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    todoListID: string

}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todoListID: string
}
type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    title: string
    todoListID: string

}
type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    todoListID: string
    value: FilterValuesType

}
type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT


const initialState: Array<TodoListType> = [


]

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return state.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            return [{ id: action.todoListID, title: action.title, filter: "all" }, ...state]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(tl => tl.id === action.todoListID ? { ...tl, filter: action.value } : tl)

        default:
            return state;
    }

}

export const removeTodoListAC = (todoListID: string): RemoveTodoListAT => {
    return { type: "REMOVE-TODOLIST", todoListID }
}
export const addTodoListAC = (title: string): AddTodoListAT => {
    return { type: "ADD-TODOLIST", title, todoListID: v1() }
}
export const changeTodoListTitleAC = (title: string, todoListID: string): ChangeTodoListTitleAT => {
    return { type: "CHANGE-TODOLIST-TITLE", title, todoListID }
}
export const changeTodoListFilterAC = (todoListID: string, value: FilterValuesType): ChangeTodoListFilterAT => {
    return { type: "CHANGE-TODOLIST-FILTER", todoListID, value }
}