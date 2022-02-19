
import {TasksStateType} from "../Todolist";
import {v1} from "uuid";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

test('task should be removed',() => {

        const startState: TasksStateType = {
            "todolistID1" : [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: true},
                {id: '3', title: "ReactJS", isDone: false},

            ],
            "todolistID2" : [
                {id: '1', title: "Nike", isDone: true},
                {id: '2', title: "Puma", isDone: false},
                {id: '3', title: "Adidas", isDone: false},

            ]
        }

        let action = removeTaskAC("todolistID2", "2");

        let newState = tasksReducer(startState, action);

        expect(newState["todolistID1"].length).toBe(3);
        expect(newState["todolistID2"].length).toBe(2);

        expect(newState["todolistID2"].every(t => t.id !== "2")).toBeTruthy();
}
)

test ("task should be added", () => {

    const startState: TasksStateType = {
        "todolistID1" : [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},

        ],
        "todolistID2" : [
            {id: '1', title: "Nike", isDone: true},
            {id: '2', title: "Puma", isDone: false},
            {id: '3', title: "Adidas", isDone: false},

        ]
    }

    let action = addTaskAC("todolistID2", "Rebook");

    let newState = tasksReducer(startState, action);

    expect(newState["todolistID1"].length).toBe(3);
    expect(newState["todolistID2"].length).toBe(4);
    expect(newState["todolistID2"][0].title).toBe("Rebook");
    expect(newState["todolistID2"][0].id).toBeDefined();
    expect(newState["todolistID2"][0].isDone).toBe(false);


})

test('tasks status should be changed',() => {

        const startState: TasksStateType = {
            "todolistID1" : [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false},
                {id: '3', title: "ReactJS", isDone: false},

            ],
            "todolistID2" : [
                {id: '1', title: "Nike", isDone: true},
                {id: '2', title: "Puma", isDone: false},
                {id: '3', title: "Adidas", isDone: false},

            ]
        }

        let action = changeTaskStatusAC("todolistID2", "2", true);

        let newState = tasksReducer(startState, action);

        expect(newState["todolistID1"][1].isDone).toBe(false);
        expect(newState["todolistID2"][1].isDone).toBe(true);
        expect(newState["todolistID2"][1].id).toBe('2');
    }
)

test('tasks title should be changed',() => {

        const startState: TasksStateType = {
            "todolistID1" : [
                {id: '1', title: "HTML&CSS", isDone: true},
                {id: '2', title: "JS", isDone: false},
                {id: '3', title: "ReactJS", isDone: false},

            ],
            "todolistID2" : [
                {id: '1', title: "Nike", isDone: true},
                {id: '2', title: "Puma", isDone: false},
                {id: '3', title: "Adidas", isDone: false},

            ]
        }

        let action = changeTaskTitleAC("todolistID2", "2", "Reebok");

        let newState = tasksReducer(startState, action);

        expect(newState["todolistID1"][1].title).toBe("JS");
        expect(newState["todolistID2"][1].title).toBe("Reebok");

        expect(newState["todolistID1"][1].id).toBe('2');
        expect(newState["todolistID2"][1].id).toBe('2');
    }
)

test ("new property and new array should be added, when new todolist is added", () => {

    const startState: TasksStateType = {
        "todolistID1" : [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},

        ],
        "todolistID2" : [
            {id: '1', title: "Nike", isDone: true},
            {id: '2', title: "Puma", isDone: false},
            {id: '3', title: "Adidas", isDone: false},

        ]
    }

    let action = addTodolistAC("New todolist");

    let newState = tasksReducer(startState, action);

    const keys = Object.keys(newState);
    const newKey = keys.find(k => k !== "todolistID1" && k !== "todolistID2")

    if (!newKey) {
        throw Error ("New array should be added")
    }

    expect(newState[newKey]).toStrictEqual([]);
    expect(keys.length).toBe(3);
    expect(newKey).toBeDefined();



})

test (" property and array should be deleted", () => {

    const startState: TasksStateType = {
        "todolistID1" : [
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},

        ],
        "todolistID2" : [
            {id: '1', title: "Nike", isDone: true},
            {id: '2', title: "Puma", isDone: false},
            {id: '3', title: "Adidas", isDone: false},

        ]
    }

    let action = removeTodolistAC("todolistID2");

    let newState = tasksReducer(startState, action);

    const keys = Object.keys(newState);



    expect(keys[0]).toBe("todolistID1");
    expect(keys.length).toBe(1);
    expect(newState["todolistID2"]).toBeUndefined();


})
