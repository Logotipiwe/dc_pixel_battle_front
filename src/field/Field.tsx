import React, {PropsWithChildren, useContext} from "react";
import Div from "../components/Div";
import {RootContext} from "../RootStore";

function Field(props: PropsWithChildren) {
    const rootStore = useContext(RootContext);
    return (
        <Div id="Field">
            {rootStore.field.map(row => {

                return <Div className>
                    {row.map(cell => {
                        return <Div className="cell"></Div>
                    })}
                </Div>
            })}
        </Div>
    )
}

export default Field