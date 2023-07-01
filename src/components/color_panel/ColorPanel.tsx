import Div from "../Div";
import {useContext} from "react";
import {RootContext} from "../../RootStore";
import "./ColorPanel.scss"
import {observable} from "mobx";
import {observer} from "mobx-react";

function ColorPanel(props) {
    const rootStore = useContext(RootContext);
    return (
        <Div id="ColorPanelBox">
            <Div id="ColorPanel">
                {rootStore.colors.map((color, i) => {
                    const isSelected = i === rootStore.selectedColorIndex;
                    console.log("AA " + rootStore.selectedColorIndex)
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