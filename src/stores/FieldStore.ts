import RootStore from "../RootStore";
import {makeAutoObservable} from "mobx";

export default class FieldStore {

    constructor(rootStore: RootStore) {
        makeAutoObservable(this)

        this.rootStore = rootStore;

        this.increaseCellsSize = this.increaseCellsSize.bind(this);
        this.decreaseCellsSize = this.decreaseCellsSize.bind(this);
    }

    rootStore: RootStore;

    cellsSize: number = 40;

    decreaseCellsSize(){
        if(this.cellsSize <= 15) return;
        this.cellsSize = this.cellsSize - 5;
    }

    increaseCellsSize(){
        if(this.cellsSize >= 40) return;
        this.cellsSize = this.cellsSize + 5;
    }
}