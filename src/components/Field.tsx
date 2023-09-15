import React, {PropsWithChildren} from "react";
import Div from "./Div";
import {observer} from "mobx-react";
import {useRootStore} from "../index";
import "./Field.scss"
import CellComponent from "./field/Cell";

function Field(props: PropsWithChildren) {
    const rootStore = useRootStore();
    const fieldStore = rootStore.fieldStore;
    return (
        <Div id="Field" className={`size-${fieldStore.cellsSize}`}>
            <Div id="Field_inner">
            {rootStore.field?.map((row, i) => {
                return <Div className="field_row" key={i}>
                    {row.map((cell, j) => {
                        return <CellComponent cell={cell} j={j}/>
                    })}
                </Div>
            })}
            </Div>
        </Div>
    )
}

export default observer(Field)