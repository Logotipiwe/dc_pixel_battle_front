import {makeAutoObservable} from "mobx";
import Cell from "./model/Cell";
import {createContext} from "react";
import {PixelDto} from "./model/Pixel";
import {doFetch, getBackHost, getBackUrl} from "./Utils";
import User from "./model/User";

export default class RootStore {
    constructor() {
        makeAutoObservable(this)
        this.init()

        this.selectColor = this.selectColor.bind(this);
        this.clickCell = this.clickCell.bind(this);
    }

    async init(){
        await this.loadUser();
        this.loadPixels().then((res: PixelDto[])=>{
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
    }

    field?: Cell[][]

    user?: User;

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

    loadUser(){
        return doFetch(getBackHost() + "/oauth2/getUser").then((res: User)=>{
            this.user = res;
            return res;
        })
    }

    loadPixels(){
        return doFetch( getBackUrl() + "/load-pixels")
    }

    selectColor(i){
        this.selectedColorIndex = i
    }

    clickCell(cell: Cell){
        cell.color = this.colors[this.selectedColorIndex].color
    }
}
export const RootContext = createContext<RootStore>(new RootStore());