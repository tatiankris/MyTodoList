import React, {useEffect, useState} from 'react';
import axios from "axios";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'TASKS-API',
}

export const GetTasks = () => {

    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const getTasks = () => {
        tasksAPI.getTask(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        <div>{JSON.stringify(state)}</div>
        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {
                        setTodolistId(e.currentTarget.value)
                   }}
            />

            <button onClick={getTasks}>get tasks</button>
        </div>

    </div>
}


export const CreateTask = () => {

    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskTitle, setTaskTitle] = useState<string>('');

    const createTask = () => {
        tasksAPI.createTask(todolistId, taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={'todolistId'} value={todolistId}
               onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
        <input placeholder={'taskTitle'} value={taskTitle}
               onChange={(e) => {setTaskTitle(e.currentTarget.value)}}/>
        <button onClick={createTask}>create Task</button>
    </div>

    </div>
}


export const DeleteTask = () => {

    const [state, setState] = useState<any>(null);

    useEffect (() => {
        const todolistId = 'a96b2a60-dde6-4bfa-89fd-7b55b1d07e11';
        const taskId = '7de6e7f6-d069-4cc8-99d0-8f64216ccbbb';
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const UpdateTask = () => {

    const [state, setState] = useState<any>(null);

    const [title, setTitle] = useState<string>('title 1');
    const [description, setDescription] = useState<string>('description 1');
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);

    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    const taskModel = {
        title: title,
        description: description,
        status: status,
        priority: priority,
        startDate: "",
        deadline: "",
    }

    // Пишет ОШИБКУ в в put-запросе, потому что { ... resultCode: 1, ...}
    // т.к. свойства startDate: и deadline: НЕ соответствуют типу (я не знаю как это решить)

    const updateTask = () => {
        tasksAPI.updateTask(todolistId, taskId, taskModel)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}

        <div>
            <input placeholder={'todolistId'} value={todolistId}
                   onChange={(e) => {setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={'taskId'} value={taskId}
                   onChange={(e) => {setTaskId(e.currentTarget.value)}}/>
            <div>

                <input placeholder={'title'} value={title}
                       onChange={(e) => {setTitle(e.currentTarget.value)}}/>
                <input placeholder={'description'} value={description}
                       onChange={(e) => {setDescription(e.currentTarget.value)}}/>
                <input placeholder={'status'} value={status} type={'number'}
                       onChange={(e) => {setStatus(+e.currentTarget.value)}}/>
                <input placeholder={'priority'} value={priority} type={'number'}
                       onChange={(e) => {setPriority(+e.currentTarget.value)}}/>

            </div>
            <button onClick={updateTask}>update Task</button>
        </div>


    </div>
}