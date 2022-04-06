import React, {useEffect, useState} from 'react';
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'TODOLISTS-API',
}



export const GetTodoLists = () => {

    const [state, setState] = useState<any>(null);

    useEffect (() => {
        todolistAPI.getTodoLists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const CreateTodoLists = () => {

    const [state, setState] = useState<any>(null);

    useEffect (() => {
        const title = "List of SOMTH"
        todolistAPI.createTodoLists(title)
            .then((res) => {

                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const DeleteTodoLists = () => {

    const [state, setState] = useState<any>(null);

    useEffect (() => {
        const todolistId = "5b843236-859b-43a1-bd56-18d81e26fec2"
        todolistAPI.deleteTodoLists(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>

}

export const UpdateTodoLists = () => {

    const [state, setState] = useState<any>(null);

    useEffect (() => {
        const todolistId = "a4d5aab2-efb9-47a7-9082-1cf848088742"
        const title = "List of WTF..."

        todolistAPI.updateTodoLists(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>

}






