import React from "react";
import {action} from "@storybook/addon-actions";
import {EditableSpan} from "./EditableSpan";


export default  {
    title: "EditableSpan Component",
    component: EditableSpan,
}

const callback = action("Editable span was changed");

export const EditableSpanBaseExample = (props: any) => {
    return <EditableSpan title={'start value'} onChange={callback}/>
}
