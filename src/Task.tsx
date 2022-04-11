import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./components/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "./api/tasks-api";

type TaskPropsType = {
    todolistID: string
    changeTaskStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
    removeTask: (todolistID: string, taskId: string) => void
    changeTaskTitle: (todolistID: string, id: string, title: string) => void
    task: TaskType
}
export const Task = React.memo((props: TaskPropsType) => {

    const onChangeStatusHandler = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {

            let newIsDoneValue = e.currentTarget.checked
            props.changeTaskStatus(props.todolistID, props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
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


    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>

        <Checkbox
            onChange={onChangeStatusHandler}
            checked={props.task.status === TaskStatuses.Completed}/>
        <EditableSpan title={props.task.title} onChange={onChangeTaskHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})