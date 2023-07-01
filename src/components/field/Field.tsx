import React, {PropsWithChildren, useContext} from "react";
import Div from "../Div";
import {RootContext} from "../../RootStore";
import {observer} from "mobx-react";
import {log} from "util";

function Field(props: PropsWithChildren) {
    const rootStore = useContext(RootContext);
    return (
        <Div id="Field">
            {rootStore.field?.map(row => {

                return <Div className="field_row" onClick={e=>{
                    console.log("aaaaaaaaaa")}}>
                    {row.map((cell, i) => {
                        return <Div
                            key={i}
                            className="cell"
                            style={{backgroundColor: cell.color}}
                            onClick={rootStore.clickCell.bind(null, cell)}
                        />
                    })}
                </Div>
            })}
        </Div>
    )
}

export default observer(Field)