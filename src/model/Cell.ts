import {makeAutoObservable} from "mobx";

export default class Cell{
    constructor() {
        makeAutoObservable(this)
        this.color = 'yellow'
    }

    color: string
}