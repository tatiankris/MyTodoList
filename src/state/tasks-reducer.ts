import {TasksStateType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistID1, todolistID2} from "./todolists-reducer";

type removeTaskActionType = {
    type: "REMOVE-TASK"
    todolistID: string
    taskID: string
}

type addTaskActionType = {
    type: "ADD-TASK",
    todolistID: string,
    title: string,
}

type changeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    todolistID: string,
    taskID: string,
    isDone: boolean,
}

type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    todolistID: string,
    taskID: string,
    title: string,
}

type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType |
    changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType


const initialState: TasksStateType = {
    [todolistID1]: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2] : [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType):TasksStateType => {

    switch (action.type) {

        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID];
            const filteredTasks = tasks.filter(f => f.id !== action.taskID);
            stateCopy[action.todolistID] = filteredTasks;
            return stateCopy
        }

        case "ADD-TASK": {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistID];
            let newTasks = [{id: v1(), title: action.title, isDone: false}, ...tasks];
            stateCopy[action.todolistID] = newTasks;
            return stateCopy;
        }

        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state, [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t) } ;
            return stateCopy;
        }

        case "CHANGE-TASK-TITLE": {
            const stateCopy = {...state, [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, title: action.title} : t) } ;
            return stateCopy;
        }

        case "ADD-TODOLIST": {
            const stateCopy = {...state, [action.todolistID]: []};
            return stateCopy;
        }

        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }

        default:
          return state;
    }
}

export const removeTaskAC = (todolistID: string, taskID: string): removeTaskActionType => {
    return {
        type: "REMOVE-TASK",
        todolistID,
        taskID,
    }
}

export const addTaskAC = (todolistID: string, title: string): addTaskActionType => {
    return {
        type: "ADD-TASK",
        todolistID,
        title,
    }
}

export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone:boolean): changeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistID,
        taskID,
        isDone,
    }
}

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string): changeTaskTitleActionType => {
    return {
        type: "CHANGE-TASK-TITLE",
        todolistID,
        taskID,
        title,
    }
}


