import React from "react";
import {action} from "@storybook/addon-actions";
import EditableSpan from "../EditableSpan";


export default {
    title: "EditabaleSpan Component",
    component: EditableSpan
}

const changeTitleCallback = action("Value changed")

export const EditableSpanBaseExample = () => {
    return <EditableSpan title={"Start value"} changeTitle={changeTitleCallback}/>
}