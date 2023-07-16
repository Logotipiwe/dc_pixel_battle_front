import React, {useContext} from 'react';
import './App.scss';
import Field from "./components/field/Field";
import ColorPanel from "./components/color_panel/ColorPanel";
import {observer} from "mobx-react";
import Div from "./components/Div";
import {useRootStore} from "./index";

function App() {
    const rootStore = useRootStore()
    const user = rootStore.user;
    return (
        <div id="App">
            <Div id="header">{user
                ? <Div>
                    <a href="/oauth2/logout">Log out</a>
                    <p>Logged as: {user.name}</p>
                    {rootStore.usersCount !== undefined
                        ? <p>Users: {rootStore.usersCount}</p>
                        : null}
                </Div>
                : <Div>Loading...</Div>}
            </Div>
            <Field/>
            <ColorPanel/>
        </div>
    );
}

export default observer(App);
