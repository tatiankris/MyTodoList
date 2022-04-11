import axios from "axios";
import {ResponseType} from "./todolist-api";


export enum TaskStatuses {

    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {

    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type GetTaskResponse = {
    items: Array<TaskType>
    totalCount: number
    error:  string | null
}
const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'b455b66d-c8e6-436f-93e4-c18a17b3472d',
    }
})

export const tasksAPI = {

    getTask(todolistId: string) {
        const promise = instance.get<Array<TaskType>>(`todo-lists/${todolistId}/tasks`)
        return promise
    },

    createTask(todolistId: string, taskTitle: string) {
        const promise = instance.post<ResponseType<{}>> (`todo-lists/${todolistId}/tasks`, {title: taskTitle})
        return promise
    },

    deleteTask(todolistId: string, taskId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}/tasks/${taskId}`)
        return promise
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        const promise = instance.put<ResponseType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
        return promise
    }

}