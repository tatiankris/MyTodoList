import React, {useCallback, useState} from 'react';
import './App.css';
import {TasksStateType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {AppRootState} from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type todolistType ={
    id: string
    title: string
    filter: FilterValuesType
}

function App() {



    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<todolistType>>(state => state.todoLists);
    const tasks = useSelector<AppRootState, TasksStateType>(state => state.tasks);


    const addTask = useCallback((todolistID: string, title: string) => {
        dispatch(addTaskAC(todolistID, title));
    }, [dispatch])

    const removeTask = useCallback((todolistID: string, id: string) => {
       dispatch(removeTaskAC(todolistID, id));
    }, [dispatch])

    const changeStatus = useCallback((todolistID: string, taskId: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistID, taskId, isDone));
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, id: string, title: string) => {
        dispatch(changeTaskTitleAC(todolistID, id, title));
    }, [dispatch])


    const addTodoList = useCallback((title: string) => {
        dispatch(addTodolistAC(title));
    }, [dispatch])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todolistID, value));

    }, [dispatch])

    const removeTodolist = useCallback((todolistID: string) => {
        dispatch(removeTodolistAC(todolistID));
    }, [dispatch])

    const changeTodolistTitle = useCallback((todolistID: string, title: string) => {
        dispatch(changeTodolistTitleAC(todolistID, title));
}, [dispatch])

    console.log("App");
    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" component="div">
                        News
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm callBack={addTodoList}/>
            </Grid>
            <Grid container spacing={3} style={{margin:"0 10px 0 10px"}}>
                {todoLists.map(m => {

                    let allTodolistTasks = tasks[m.id]
                    let tasksForTodolist = allTodolistTasks

                    return (
                        <Grid item key={m.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist title={m.title}
                                          key={m.id}
                                          todolistID={m.id}
                                          tasks={tasksForTodolist}
                                          removeTask={removeTask}
                                          changeFilter={changeFilter}
                                          addTask={addTask}
                                          changeTaskStatus={changeStatus}
                                          filter={m.filter}
                                          removeTodolist={removeTodolist}
                                          changeTaskTitle={changeTaskTitle}
                                          changeTodolistTitle={changeTodolistTitle}

                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default App;