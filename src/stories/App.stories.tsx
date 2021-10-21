import React from "react";
import App from "../App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";





export default {
    title: "App Component",
    component: App,
    decorators:[ReduxStoreProviderDecorator]
}


export const AppBaseExample = () => {
    return <App/>
}