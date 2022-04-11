import React, {useCallback} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {FilterValuesType} from "./state/todolists-reducer";

import {TaskStatuses, TaskType} from "./api/tasks-api";
import {TasksStateType} from "./state/tasks-reducer";


type PropsType = {
    todolistID: string
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (todolistID: string, id: string, title: string) => void
    changeTodolistTitle: (todolistID: string, title: string) => void
}

export const Todolist = React.memo(function (props: PropsType) {

    console.log("Todolist");



    const onAllClickHandler = useCallback(
        () => props.changeFilter(props.todolistID, "all"),
        [props.changeFilter, props.todolistID]);

    const onActiveClickHandler = useCallback(
        () => props.changeFilter(props.todolistID,"active"),
        [props.changeFilter, props.todolistID]);

    const onCompletedClickHandler = useCallback(
        () => props.changeFilter(props.todolistID,"completed"),
        [props.changeFilter, props.todolistID]);


    const removeTodolistHandler = useCallback(
        () => props.removeTodolist(props.todolistID),
        [props.removeTodolist, props.todolistID])

    const addTaskHandler = useCallback(
        (title: string) => {props.addTask(props.todolistID, title)},
        [props.addTask, props.todolistID])

    const changeTodolistTitle = useCallback(
        (title: string) => {props.changeTodolistTitle(props.todolistID, title)},
        [props.changeTodolistTitle, props.todolistID]);


    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete />
            </IconButton></h3>
        <AddItemForm callBack={addTaskHandler} />

        <div>
            {
                tasksForTodolist.map(t => <Task
                        todolistID={props.todolistID}
                        changeTaskStatus={props.changeTaskStatus}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        task={t}
                        key={t.id}
                    />

                )
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? "contained" : "text"}
                    onClick={onAllClickHandler}>All</Button>
            <Button color={'primary'} variant={props.filter === 'active' ? "contained" : "text"}
                onClick={onActiveClickHandler}>Active</Button>
            <Button color={"secondary"} variant={props.filter === 'completed' ? "contained" : "text"}
                onClick={onCompletedClickHandler}>Completed</Button>
        </div>
    </div>
});

