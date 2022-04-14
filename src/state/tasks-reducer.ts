import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType,
    todolistID1,
    todolistID2
} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/tasks-api";


export type TasksStateType = {
    [key: string] : Array<TaskType>
}


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
    status: TaskStatuses,
}

type changeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    todolistID: string,
    taskID: string,
    title: string,
}

type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusActionType |
    changeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType | SetTodolistsActionType


const initialState: TasksStateType = {
    [todolistID1]: [
        {
            id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistID1, order: 0,
            addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""
        },
        {
            id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1, order: 1,
            addedDate: '', priority: TaskPriorities.Low, startDate: "", deadline: "", description: ""
        },
    ],
    [todolistID2] : [
        {
            id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistID2, order: 0,
            addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""
        },
        {
            id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1, order: 1,
            addedDate: '', priority: TaskPriorities.Low, startDate: "", deadline: "", description: ""
        },
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
            let newTasks = [
                {
                id: v1(), title: action.title, status: TaskStatuses.Completed, todoListId: action.todolistID, order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""
                },
                ...tasks
            ];
            stateCopy[action.todolistID] = newTasks;
            return stateCopy;
        }

        case "CHANGE-TASK-STATUS": {
            const stateCopy = {...state, [action.todolistID]: state[action.todolistID]
                    .map(t => t.id === action.taskID ? {...t, status: action.status} : t) } ;
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

        case "SET-TODOLISTS": {
            const stateCopy = {...state}
                action.todoLists.forEach(
                tl => {
                    stateCopy[tl.id] = []
                })
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

export const changeTaskStatusAC = (todolistID: string, taskID: string, status: TaskStatuses): changeTaskStatusActionType => {
    return {
        type: "CHANGE-TASK-STATUS",
        todolistID,
        taskID,
        status,
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


