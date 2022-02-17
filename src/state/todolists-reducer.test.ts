import {TasksStateType} from "../Todolist";
import {v1} from "uuid";
import {todolistType} from "../App";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./todolists-reducer";


test('todolist should been removed', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let state: Array<todolistType> = [
        {id:todolistID1, title:'What to learn', filter: 'all'},
        {id:todolistID2, title:'What to buy', filter: 'all'},
    ]

    let newState = todolistsReducer(state, RemoveTodolistAC(todolistID2));

    expect(newState.length).toBe(1);
    expect(newState[0].title).toBe("What to learn");
    expect(newState[0].filter).toBe("all");

})

test('todolist title should been changed', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let state: Array<todolistType> = [
        {id:todolistID1, title:'What to learn', filter: 'all'},
        {id:todolistID2, title:'What to buy', filter: 'all'},
    ]

    // let action = {
    //     type: "CHANGE-TODOLIST-TITLE" as const,
    //     id: todolistID2,
    //     title: "What to do",
    // }

    let newState = todolistsReducer(state, ChangeTodolistTitleAC(todolistID2, "What to do"));

    expect(newState.length).toBe(2);
    expect(newState[1].title).toBe("What to do");
    expect(newState[1].filter).toBe("all");

})

test('todolist should been added', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let state: Array<todolistType> = [
        {id:todolistID1, title:'What to learn', filter: 'all'},
        {id:todolistID2, title:'What to buy', filter: 'all'},
    ]

    // let action = {
    //     type: "ADD-TODOLIST" as const,
    // }

    let newState = todolistsReducer(state, AddTodolistAC());

    expect(newState.length).toBe(3);
    expect(newState[2].title).toBe("What to do");
    expect(newState[2].filter).toBe("all");

})

test('todolist filter should been changed', () => {

    const todolistID1 = v1();
    const todolistID2 = v1();

    let state: Array<todolistType> = [
        {id:todolistID1, title:'What to learn', filter: 'all'},
        {id:todolistID2, title:'What to buy', filter: 'all'},
    ]

    // const action = {
    //     type: "CHANGE-TODOLIST-FILTER" as const,
    //     id: todolistID2,
    //     filter: "completed" as const,
    // }

    let newState = todolistsReducer(state, ChangeTodolistFilterAC(todolistID2, "completed"));

    expect(newState.length).toBe(2);
    expect(newState[1].title).toBe("What to buy");
    expect(newState[1].filter).toBe("completed");

})

