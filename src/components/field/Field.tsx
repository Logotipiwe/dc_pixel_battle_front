import React, {PropsWithChildren} from "react";
import Div from "../Div";
import {observer} from "mobx-react";
import {useRootStore} from "../../index";

function Field(props: PropsWithChildren) {
    const rootStore = useRootStore();
    return (
        <Div id="Field">
            {rootStore.field?.map((row, i) => {
                return <Div className="field_row" key={i}>
                    {row.map((cell, j) => {
                        return <Div
                            key={j}
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