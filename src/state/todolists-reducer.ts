import {FilterValuesType, todolistType} from "../App";
import {v1} from "uuid";

type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST"
    id: string
}

type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
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



export const todolistsReducer = (state: Array<todolistType>, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(t => t.id != action.id);
        }

        case "ADD-TODOLIST": {
            const todolistID3 = v1();
            return [...state, {id:todolistID3, title:'What to do', filter: 'all'}]
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
            throw new Error("I don't understand this action type")

    }
}

export const RemoveTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {
        type: "REMOVE-TODOLIST",
        id: todolistID,
    }
}

export const AddTodolistAC = (): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST'
    }
}

export const ChangeTodolistTitleAC = (todolistID: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id: todolistID,
        title: title,
    }
}

export const ChangeTodolistFilterAC = (todolistID: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        id: todolistID,
        filter: filter,
    }
}