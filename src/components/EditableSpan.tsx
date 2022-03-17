import React, {useState, FocusEvent, ChangeEvent} from "react";
import {TextField} from "@mui/material";

type PropsType = {
    title: string
    onChange: (title: string) => void
}

export const EditableSpan = React.memo(function  ({title,...props}: PropsType) {

    const [edit, setEdit] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(title);
    // console.log(newTitle)

    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }


    const changeTaskTitle = () => {
        let updatedTitle = newTitle.trim();
        if (updatedTitle !== ""){
            props.onChange(updatedTitle);
        }
    }


    const editFalse = () => {
        setEdit(false);
        changeTaskTitle();
    }

    const editTrue = () => {
        setEdit(true);
        setNewTitle(title);
    }

    console.log("EditableSpan");
    return (
        edit
            ? <TextField value={newTitle} onChange={onChangeHandler} onBlur={editFalse} autoFocus />
            : <span onDoubleClick={editTrue}>{title}</span>
    )
})