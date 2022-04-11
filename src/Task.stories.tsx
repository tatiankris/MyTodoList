import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "./api/tasks-api";
import {todolistID1} from "./state/todolists-reducer";




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
              task={ {
                  id: '1',  title: "CSS", status: TaskStatuses.Completed, todoListId: todolistID1, order: 0,
                  addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""
              } }
        />
        <Task todolistID={'todolistID1'}
              changeTaskStatus={changeTaskStatusCallback}
              removeTask={removeTaskCallback}
              changeTaskTitle={changeTaskTitleCallback}
              task={ {
                  id: '2',  title: "JS", status: TaskStatuses.New, todoListId: todolistID1, order: 0,
                  addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""
              } }
        />
    </>

}
