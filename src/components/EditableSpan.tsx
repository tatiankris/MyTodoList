import React, {useState, FocusEvent, ChangeEvent} from "react";

type PropsType = {
    title: string
    callBack: (title: string) => void
}

export function EditableSpan ({title,...props}: PropsType) {

    const [edit, setEdit] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    // console.log(newTitle)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }


    const addTask = () => {
        let updatedTitle = newTitle.trim();
        if (updatedTitle !== ""){
            props.callBack(updatedTitle);
        }
    }


    const editTrue = () => {
        setEdit(false)
        addTask();
    }

    const editFalse = () => {
        setEdit(true)

    }

    return (
        edit
            ? <input value={newTitle} onChange={onChangeHandler} onBlur={editTrue} autoFocus />
            : <span onDoubleClick={editFalse}>{title}</span>
    )
}