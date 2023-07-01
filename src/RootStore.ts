import {makeAutoObservable} from "mobx";
import Cell from "./model/Cell";
import {createContext} from "react";

export default class RootStore {
    constructor() {
        makeAutoObservable(this)
        const rows = new Array(this.height).fill(null);
        this.field = rows.map(_ => new Array(this.width).fill(null).map(_ => new Cell()))
    }

    field: Cell[][]

    height = 5;
    width = 5;
}
export const RootContext = createContext<RootStore>(new RootStore());