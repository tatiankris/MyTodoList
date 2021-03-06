import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {Dispatch} from "redux";

export type FilterValuesType = "all" | "active" | "completed";
export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}

type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType

}
export type SetTodolistsActionType = {
    type: "SET-TODOLISTS"
    todoLists: Array<TodolistType>,
}

export type ActionsType = RemoveTodolistActionType | ChangeTodolistTitleActionType |
    AddTodolistActionType | ChangeTodolistFilterActionType | SetTodolistsActionType;

export const todolistID1 = v1();
export const todolistID2 = v1();

const initialState: Array<TodolistDomainType> = [
    {id:todolistID1, title:'What to learn', filter: 'all', order: 0, addedDate: ""},
    {id:todolistID2, title:'What to buy', filter: 'all', order: 0, addedDate: ""},
]


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType):Array<TodolistDomainType>  => {

    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id != action.id);
        }

        case "ADD-TODOLIST": {
            return [{id: action.todolistID, title: action.title, filter: 'all', order: 0, addedDate: ""}, ...state]
        }

        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(t => t.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return [...state];
        }

        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(t => t.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return [...state];
        }

        case "SET-TODOLISTS": {
                return action.todoLists.map(t => ({...t, filter: "all"}));
        }


        default:
            return state;

    }
}

export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistID,
    }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistID: v1(),
    }
}

export const changeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistID,
        title: title,
    }
}

export const changeTodolistFilterAC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistID,
        filter: filter,
    }
}

export const setTodolists = (todoLists: Array<TodolistType>): SetTodolistsActionType => {
    return {
        type: "SET-TODOLISTS",
        todoLists,
    }
}




export const getTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTodoLists()
            .then(res => {
                dispatch(setTodolists(res.data));
            })

    }
}