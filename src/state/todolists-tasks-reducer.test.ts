import {addTodolistAC, TodolistDomainType, todolistsReducer} from "./todolists-reducer";
import {tasksReducer, TasksStateType} from "./tasks-reducer";


test ("d0", () => {


    const todolistsState: Array<TodolistDomainType> = [];

    const tasksState: TasksStateType = {};

    let action = addTodolistAC("New todolist");
    let newtodolistsState = todolistsReducer(todolistsState, action);
    let newtasksState = tasksReducer(tasksState, action);

    const keys = Object.keys(newtasksState);

    const idFromTasks = keys[0];
    const idFromTodolists = newtodolistsState[0].id;


    expect(idFromTasks).toBe(action.todolistID);
    expect(idFromTodolists).toBe(action.todolistID);

    expect(newtodolistsState.length).toBe(1);
    expect(keys.length).toBe(1);

})
