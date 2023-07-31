import Div from "../Div";
import "./ColorPanel.scss"
import {observer} from "mobx-react";
import {useRootStore} from "../../index";

function ColorPanel(props) {
    const rootStore = useRootStore();
    const fieldStore = rootStore.fieldStore;
    return (
        <Div id="ColorPanelBox">
            <Div id="resize-buttons">
                <button onClick={fieldStore.increaseCellsSize}>+</button>
                <button onClick={fieldStore.decreaseCellsSize}>-</button>
            </Div>
            <Div id="ColorPanel">
                {rootStore.colors.map((color, i) => {
                    const isSelected = i === rootStore.selectedColorIndex;
                    return <Div
                        key={i}
                        className={"color-elem " + (isSelected ? "color-elem--selected": "")}
                        onClick={e=>rootStore.selectColor(i)}
                        style={{backgroundColor: color.color}}
                    >

                    </Div>
                })}
            </Div>
        </Div>
    )
}

export default observer(ColorPanel);