import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    todolistID: string
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskTitle: (todolistID: string, id: string, title: string) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onChangeStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(props.todolistID, props.task.id, e.currentTarget.checked);
        },
        [props.changeTaskStatus, props.todolistID, props.task.id])

    const onClickHandler = useCallback(
        () => props.removeTask(props.todolistID, props.task.id),
        [props.removeTask, props.todolistID, props.task.id]);

    const onChangeTaskHandler = useCallback(
        (title: string) => {
            props.changeTaskTitle(props.todolistID, props.task.id, title)
        },
        [props.changeTaskTitle, props.todolistID, props.task.id])


    return <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>

        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.isDone}/>
        <EditableSpan title={props.task.title} onChange={onChangeTaskHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})