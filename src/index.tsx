import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RootStore, {RootContext} from "./RootStore";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RootContext.Provider value={new RootStore()}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </RootContext.Provider>
);
