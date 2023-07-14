import React, {createContext, useContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RootStore from "./RootStore";

let rootStore = new RootStore();
const RootContext = createContext<RootStore | undefined>(undefined);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <RootContext.Provider value={rootStore}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </RootContext.Provider>
);

export const useRootStore = ()=>{
    const ctx = useContext(RootContext);
    if(ctx === undefined) throw new Error("no root store")
    return ctx
}