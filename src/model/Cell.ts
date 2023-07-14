import {makeAutoObservable} from "mobx";

export default class Cell{
    constructor(
        row: number,
        column: number,
        color?: string
    ) {
        makeAutoObservable(this)
        this.row = row
        this.col = column
        this.color = color ? color : "white"
    }

    row: number
    col: number
    color: string
}