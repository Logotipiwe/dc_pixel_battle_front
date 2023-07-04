import React, {useContext} from 'react';
import './App.scss';
import Field from "./components/field/Field";
import {RootContext} from "./RootStore";
import ColorPanel from "./components/color_panel/ColorPanel";
import {observer} from "mobx-react";
import Div from "./components/Div";

function App() {
    const rootStore = useContext(RootContext)
    const user = rootStore.user;
    return (
        <div id="App">
            <Div id="header">{user
                ? <Div>
                    <a href="/oauth2/logout">Log out</a>
                    <p>Logged as: {user.name}</p>
                </Div>
                : <Div>Loading...</Div>}
            </Div>
            <ColorPanel/>
            <Field/>
        </div>
    );
}

export default observer(App);
