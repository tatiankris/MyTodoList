
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC, todolistID1} from "./todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

test('task should be removed',() => {

        const startState: TasksStateType = {
            "todolistID1" : [
                {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '3', title: "ReactJS", status: TaskStatuses.New, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},

            ],
            "todolistID2" : [
                {id: '1', title: "Nike", status: TaskStatuses.Completed, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '2', title: "Puma", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '3', title: "Adidas", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
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
            {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '3', title: "ReactJS", status: TaskStatuses.New, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},

        ],
        "todolistID2" : [
            {id: '1', title: "Nike", status: TaskStatuses.Completed, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '2', title: "Puma", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '3', title: "Adidas", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
        ]
    }

    let action = addTaskAC("todolistID2", "Rebook");

    let newState = tasksReducer(startState, action);

    expect(newState["todolistID1"].length).toBe(3);
    expect(newState["todolistID2"].length).toBe(4);
    expect(newState["todolistID2"][0].title).toBe("Rebook");
    expect(newState["todolistID2"][0].id).toBeDefined();
    expect(newState["todolistID2"][0].status).toBe(TaskStatuses.New);


})

test('tasks status should be changed',() => {

        const startState: TasksStateType = {
            "todolistID1" : [
                {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '3', title: "ReactJS", status: TaskStatuses.New, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},

            ],
            "todolistID2" : [
                {id: '1', title: "Nike", status: TaskStatuses.Completed, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '2', title: "Puma", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '3', title: "Adidas", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            ]
        }

        let action = changeTaskStatusAC("todolistID2", "2", TaskStatuses.Completed);

        let newState = tasksReducer(startState, action);

        expect(newState["todolistID1"][1].status).toBe(TaskStatuses.New);
        expect(newState["todolistID2"][1].status).toBe(TaskStatuses.Completed);
        expect(newState["todolistID2"][1].id).toBe('2');
    }
)

test('tasks title should be changed',() => {

        const startState: TasksStateType = {
            "todolistID1" : [
                {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '3', title: "ReactJS", status: TaskStatuses.New, todoListId: "todolistID1", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},

            ],
            "todolistID2" : [
                {id: '1', title: "Nike", status: TaskStatuses.Completed, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '2', title: "Puma", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
                {id: '3', title: "Adidas", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                    addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
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
            {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '3', title: "ReactJS", status: TaskStatuses.New, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},

        ],
        "todolistID2" : [
            {id: '1', title: "Nike", status: TaskStatuses.Completed, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '2', title: "Puma", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '3', title: "Adidas", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
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
            {id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '2', title: "JS", status: TaskStatuses.Completed, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '3', title: "ReactJS", status: TaskStatuses.New, todoListId: "todolistID1", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},

        ],
        "todolistID2" : [
            {id: '1', title: "Nike", status: TaskStatuses.Completed, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '2', title: "Puma", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
            {id: '3', title: "Adidas", status: TaskStatuses.New, todoListId: "todolistID2", order: 0,
                addedDate: '', priority: TaskPriorities.Middle, startDate: "", deadline: "", description: ""},
        ]
    }

    let action = removeTodolistAC("todolistID2");

    let newState = tasksReducer(startState, action);

    const keys = Object.keys(newState);



    expect(keys[0]).toBe("todolistID1");
    expect(keys.length).toBe(1);
    expect(newState["todolistID2"]).toBeUndefined();


})
