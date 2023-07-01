import React, {useContext} from 'react';
import './App.scss';
import Field from "./components/field/Field";
import {RootContext} from "./RootStore";
import ColorPanel from "./components/color_panel/ColorPanel";
import {observer} from "mobx-react";

function App() {
    useContext(RootContext)
    console.log()
    return (
        <div id="App">
            <ColorPanel/>
            <Field/>
        </div>
    );
}

export default observer(App);
