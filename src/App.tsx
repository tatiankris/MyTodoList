import React, {useState} from 'react';
import './App.css';
import {TasksStateType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItem Form";
import {AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";

export type FilterValuesType = "all" | "active" | "completed";

export type todolistType ={
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1=v1();
    let todolistID2=v1();

    let[todoLists, setTodoLists] = useState<Array<todolistType>>([
        {id:todolistID1, title:'What to learn', filter: 'all'},
        {id:todolistID2, title:'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ]
    });





    function removeTask(todolistID: string, id: string) {
       setTasks({...tasks, [todolistID]: tasks[todolistID].filter(f => f.id !== id)})
    }

    function addTask(todolistID: string, title: string) {
        setTasks({...tasks, [todolistID]: [{id: v1(), title: title, isDone: false}, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m => m.id === taskId ? {...m, isDone: isDone} : m) })
    }

    function changeTaskTitle (todolistID: string, id: string, title: string) {
        console.log(title);
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(m=> m.id === id ? {...m, title: title} : m)})

    }


    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(m => m.id === todolistID ? {...m,filter: value} : m))

    }

    function removeTodolist(todolistID: string) {
        setTodoLists(todoLists.filter(m => todolistID !== m.id));

        delete tasks[todolistID];
        setTasks({...tasks});
    }

    function addTodoList (title: string) {
        let newTodolistID = v1();
    setTodoLists([{id:newTodolistID, title:title, filter: 'all'}, ...todoLists]);
    setTasks({ [newTodolistID] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ], ...tasks})
}

    function changeTodolistTitle (todolistID: string, title: string) {
    setTodoLists(todoLists.map(m => m.id === todolistID ? {...m,title: title} : m));
}

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

                    let tasksForTodolist = allTodolistTasks;

                    if (m.filter === "active") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone === false);
                    }
                    if (m.filter === "completed") {
                        tasksForTodolist = tasks[m.id].filter(t => t.isDone === true);
                    }
                    return (
                        <Grid item>
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