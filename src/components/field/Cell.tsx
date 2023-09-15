import Div from "../Div";
import React, {PropsWithChildren} from "react";
import {observer} from "mobx-react";
import Cell from "../../model/Cell";
import {useRootStore} from "../../index";

type Props = {
    j: number
    cell: Cell
}

function CellComponent(props: Props){
    const rootStore = useRootStore()
    const j = props.j
    const cell = props.cell
    return <Div
        key={j}
        className="cell"
        style={{backgroundColor: cell.color}}
        onClick={rootStore.clickCell.bind(null, cell)}
    />
}

export default observer(CellComponent)