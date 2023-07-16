import {makeAutoObservable} from "mobx";
import Cell from "./model/Cell";
import {PixelDto} from "./model/Pixel";
import {doFetchJson, getBackDomain, getBackPath, getBackUrl, getIdpUrl} from "./Utils";
import User from "./model/User";
import Color from "./model/Color";

export default class RootStore {
    constructor() {
        makeAutoObservable(this)
        this.init()

        this.selectColor = this.selectColor.bind(this);
        this.clickCell = this.clickCell.bind(this);

        setTimeout(()=>{
            this.sendSocketMsg("JOIN")
        }, 1000)
    }

    async init(){
        await Promise.all([
            this.loadUser(),
            this.loadColors(),
            this.loadPixels(),
            this.setupWebsocket()
        ])
    }

    ws?: WebSocket

    usersCount?: number;

    field?: Cell[][]

    user?: User;

    height = 15;
    width = 15;

    colors: Color[] = []

    selectedColorIndex = 0

    get selectedColor(): Color | undefined {
        let i = this.selectedColorIndex;
        return i === -1 ? undefined : this.colors[i]
    }

    loadColors(){
        return doFetchJson(getBackUrl() + "/api/load-colors").then((res: Color[])=>{
            this.colors = res;
            return res;
        })
    }

    loadUser(){
        return doFetchJson(getIdpUrl() + "/getUser").then((res: User)=>{
            this.user = res;
            return res;
        })
    }

    loadPixels(){
        return doFetchJson( getBackUrl() + "/api/load-pixels").then((res: PixelDto[])=>{
            const newField: Cell[][] = []
            for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
                const row: Cell[] = [];
                newField.push(row);
                for (let colIndex = 0; colIndex < this.width; colIndex++) {
                    const pixel = res.find(p=> p.row === rowIndex && p.column === colIndex);
                    const color = pixel ? pixel.color : undefined;
                    const cell = new Cell(rowIndex, colIndex, color);
                    row.push(cell)
                }
            }
            this.field = newField;
            return newField;
        })
    }

    selectColor(i){
        this.selectedColorIndex = i
    }

    clickCell(cell: Cell){
        const oldColorStr = cell.color;
        const newColor = this.selectedColor;
        if(!newColor) {
            return
        }
        cell.color = newColor.color
        let setPixelParams = {
            row: cell.row.toString(),
            col: cell.col.toString(),
            color: newColor.color
        };
        this.sendSocketMsg("SET_PIXEL", setPixelParams)
    }

    private handleWsMessage(dataStr: string) {
        const typeToHandler: Record<string, Function> = {
            "JOIN": (body)=>{
                const usersCount: number = body['count']
                this.usersCount = usersCount
            },
            "LEAVE": (body)=>{
                const usersCount: number = body['count']
                this.usersCount = usersCount
            },
            "SET_PIXEL": (body) => {
                if(this.field === undefined) throw new Error("Field is not init")
                const cell: Cell = this.field[body['row']][body["col"]];
                cell.color = body['color']
            }
        }
        const data: object = JSON.parse(dataStr)
        parseFloat(data['body'].count)
        console.log("HANDLING", data)
        let handleFunc = typeToHandler[data['type']];
        if(!handleFunc){
            console.log("NO FUNC!!!")
            return
        }
        handleFunc(data['body'])
    }

    private setupWebsocket() {
        const backUrlWithoutScheme = getBackDomain() + getBackPath();
        const ws = new WebSocket(`ws://${backUrlWithoutScheme}/api/socket/listen-changes`);
        this.ws = ws
        ws.onopen = ()=>{console.log("ws opened")}
        ws.onmessage = msg => {this.handleWsMessage(msg.data)}
        ws.onclose = ev => {console.log("ws closed", ev)}
        ws.onerror = err => {console.warn("ws err", err)}
    }


    sendSocketMsg = (type: string, msg: object = {}) => {
        if(!this.ws) throw new Error("No socket initialized")
        this.ws.send(JSON.stringify({type, ...msg}))
    }
}