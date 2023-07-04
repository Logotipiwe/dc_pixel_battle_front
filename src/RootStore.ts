import {makeAutoObservable} from "mobx";
import Cell from "./model/Cell";
import {createContext} from "react";
import {PixelDto} from "./model/Pixel";
import {getBackUrl, getHomepage, getLoginFormUrl} from "./Utils";

export default class RootStore {
    constructor() {
        console.log(window['dc_env'].AGA)
        makeAutoObservable(this)
        this.loadPixels().then((res: PixelDto[])=>{
            console.log("lol")
            const newField: Cell[][] = []
            for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
                const row: Cell[] = [];
                newField.push(row);
                for (let colIndex = 0; colIndex < this.width; colIndex++) {
                    const cell = new Cell();
                    const pixel = res.find(p=> p.row === rowIndex && p.column === colIndex);
                    if(pixel){
                        cell.color = pixel.color
                    }
                    row.push(cell)
                }
            }
            this.field = newField;
        })


        this.selectColor = this.selectColor.bind(this);
        this.clickCell = this.clickCell.bind(this);
    }

    field?: Cell[][]

    height = 15;
    width = 15;



    colors: {color: string}[] = [
        {color: 'white'},
        {color: 'black'},
        {color: 'blue'},
        {color: 'yellow'},
        {color: 'green'}
    ]

    selectedColorIndex = 0

    doFetch(url: RequestInfo | URL, data?: RequestInit){
        return fetch(url, data)
            .then(response => {
                if(response.status === 403){
                    window.location.href = getLoginFormUrl()
                }
                return response
            })
            .then(res=>{
                return res.json()
            })
    }

    loadPixels(){
        return this.doFetch( getBackUrl() + "/load-pixels")
    }

    selectColor(i){
        console.log("SELECTED " + i)
        this.selectedColorIndex = i
    }

    clickCell(cell: Cell){
        cell.color = this.colors[this.selectedColorIndex].color
    }
}
export const RootContext = createContext<RootStore>(new RootStore());