import React, {useState} from 'react';
import './App.css';
import {TasksStateType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItem Form";

export type FilterValuesType = "all" | "active" | "completed";

type todolistType ={
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

    function updateTask (todolistID: string, id: string, title: string) {
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

const addTodoList = (title: string) => {
        let newTodolistID = v1();
    setTodoLists([{id:newTodolistID, title:title, filter: 'all'}, ...todoLists]);
    setTasks({ [newTodolistID] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
        ], ...tasks})
}

    return (
        <div className="App">
            <AddItemForm callBack={addTodoList} />
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
                                  updateTask={updateTask}
                />
                    )
                })}
        </div>
    )
}

export default App;