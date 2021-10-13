import { TodoListType, FilterValuesType } from './../App';
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
type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | RemoveTodoListAT | ChangeTodoListFilterAT



export const todoListsReducer = (todoLists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todoLists.filter(tl => tl.id !== action.todoListID)
        case "ADD-TODOLIST":
            return [ {id: action.todoListID, title: action.title, filter: "all"},...todoLists]
        case "CHANGE-TODOLIST-TITLE":
            return todoLists.map(tl => tl.id === action.todoListID ? { ...tl, title: action.title } : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListID ? { ...tl, filter: action.value } : tl)

        default:
            return todoLists
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