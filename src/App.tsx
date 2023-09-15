import React, {useContext} from 'react';
import './App.scss';
import Field from "./components/Field";
import ColorPanel from "./components/ColorPanel";
import {observer} from "mobx-react";
import Div from "./components/Div";
import {useRootStore} from "./index";

function App() {
    const rootStore = useRootStore()
    const user = rootStore.user;
    return (
        <div id="App">
            <Div id="header">
                <Div id="min-slider">
                    <Div id='user-coins'>
                        <img src={"pixel-battle/img/coin.svg"}/>
                        <Div>30</Div>
                    </Div>
                </Div>
                {/*{user
                ? <>
                    <Div>{user.name}</Div>
                    {rootStore.usersCount !== undefined
                        ? <Div>P: {rootStore.usersCount}</Div>
                        : null}
                    <a href="/oauth2/logout">Log out</a>
                </>
                : <Div>Loading...</Div>}*/}
            </Div>
            <Field/>
            <ColorPanel/>
        </div>
    );
}

export default observer(App);
