import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";




type AddItemFormPropsType = {
    callBack: (title: string) => void
}

export const AddItemForm = React.memo(function  (props: AddItemFormPropsType) {

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== "") {
            props.callBack(newTitle);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addTask();
        }
    }

    // console.log("AddItemForm")
    return (
        <div>
            <TextField value={title}
                       variant={"outlined"}
                       label={"Type value"}
                       onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={addTask} color={"primary"}>
                <ControlPoint />
            </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
});
