import React, {useContext} from 'react';
import './App.css';
import Field from "./field/Field";
import {RootContext} from "./RootStore";

function App() {
    useContext(RootContext)
    console.log()
    return (
        <div id="App">
            <Field/>
        </div>
    );
}

export default App;
