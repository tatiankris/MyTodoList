import axios from "axios";
import {CreateTodoLists, DeleteTodoLists, UpdateTodoLists} from "../stories/todolists-api.stories";

type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}

export type ResponseType<D> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'api-key': 'b455b66d-c8e6-436f-93e4-c18a17b3472d',
    }
})

export const todolistAPI = {

    getTodoLists() {
        const promise = instance.get<Array<TodolistType>>('todo-lists')
        return promise
    },

    createTodoLists(title: string) {
        const promise = instance.post<ResponseType<{ item: TodolistType }>> ('todo-lists', {title})
        return promise
    },

    deleteTodoLists(todolistId: string) {
        const promise = instance.delete<ResponseType<{}>>(`todo-lists/${todolistId}`)
        return promise
    },

    updateTodoLists(todolistId: string, title: string) {
        const promise = instance.put<ResponseType<{}>>(`todo-lists/${todolistId}`, {title})
        return promise
    }

}