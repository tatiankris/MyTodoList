import React from "react";
import {Provider} from "react-redux";
import {AppRootState} from "../state/store";
import {combineReducers, createStore} from "redux";
import {todolistID1, todolistID2, todolistsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks: tasksReducer,
})

const initialGlobalState = {

    todoLists: [
    {id:'todolistID1', title:'What to learn', filter: 'all'},
    {id:'todolistID2', title:'What to buy', filter: 'all'},
    ],

    tasks: {
        ['todolistID1']: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        ['todolistID2'] : [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},

        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>
}

