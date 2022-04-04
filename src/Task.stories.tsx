import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskType} from "./Todolist";



export default  {
    title: "Task Component",
    component: Task,
}

const changeTaskStatusCallback = action("Task status was changed");
const removeTaskCallback = action("Task was removed");
const changeTaskTitleCallback = action("Task title was changed");

export const TaskBaseExample = (props: any) => {
    return <>
        <Task todolistID={'todolistID1'}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback}
              changeTaskTitle={changeTaskTitleCallback}
              task={ {id: '1',  title: "CSS", isDone: false} }
        />
        <Task todolistID={'todolistID1'}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback}
              changeTaskTitle={changeTaskTitleCallback}
              task={ {id: '2',  title: "JS", isDone: true} }
        />
    </>

}
