import React from "react";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";


export default {
    title: "Task Component",
    component: Task
}


const ChangeTaskStatusCallback = action("Status changed");
const ChangeTaskTitleCallback = action("Title changed");
const RemoveTaskCallback = action("Task removed");

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id: '1', isDone: true, title: "CSS"}}
            changeTaskStatus={ChangeTaskStatusCallback}
            changeTaskTitle={ChangeTaskTitleCallback}
            removeTask={RemoveTaskCallback}
            todoListID={"todoListID1"}
        />
        <Task
            task={{id: '2', isDone: false, title: "JS"}}
            changeTaskStatus={ChangeTaskStatusCallback}
            changeTaskTitle={ChangeTaskTitleCallback}
            removeTask={RemoveTaskCallback}
            todoListID={"todoListID2"}
        />
    </>
}