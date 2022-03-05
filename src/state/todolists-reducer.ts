import {FilterValuesType, todolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
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

type ActionsType = RemoveTodolistActionType | ChangeTodolistTitleActionType | AddTodolistActionType | ChangeTodolistFilterActionType;

export const todolistID1 = v1();
export const todolistID2 = v1();

const initialState: Array<todolistType> = [
    {id:todolistID1, title:'What to learn', filter: 'all'},
    {id:todolistID2, title:'What to buy', filter: 'all'},
]


export const todolistsReducer = (state: Array<todolistType> = initialState, action: ActionsType):Array<todolistType>  => {

    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id != action.id);
        }

        case "ADD-TODOLIST": {
            return [{id: action.todolistID, title: action.title, filter: 'all'}, ...state]
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