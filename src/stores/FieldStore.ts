import RootStore from "../RootStore";
import {makeAutoObservable} from "mobx";
import {doFetchJson, getBackUrl} from "../Utils";
import History, {HistoryDto} from "../model/History";
import {deflateRaw} from "zlib";
import Field from "../components/field/Field";
import Cell from "../model/Cell";

export default class FieldStore {

    constructor(rootStore: RootStore) {
        makeAutoObservable(this)

        this.rootStore = rootStore;

        this.increaseCellsSize = this.increaseCellsSize.bind(this);
        this.decreaseCellsSize = this.decreaseCellsSize.bind(this);
        this.playHistory = this.playHistory.bind(this);
        this.showHistoryBySteps = this.showHistoryBySteps.bind(this);
    }

    rootStore: RootStore;

    cellsSize: number = 40;

    playingHistory: boolean = false;

    decreaseCellsSize(){
        if(this.cellsSize <= 15) return;
        this.cellsSize = this.cellsSize - 5;
    }

    increaseCellsSize(){
        if(this.cellsSize >= 40) return;
        this.cellsSize = this.cellsSize + 5;
    }

    async playHistory() {
        this.playingHistory = true;
        doFetchJson(getBackUrl() + "/api/get-history").then(async (res: HistoryDto[])=>{
            const field = this.rootStore.initFieldFromColors([]);
            const history = res.map(dto=>History.fromDto(dto))
            await this.showHistoryBySteps(field, history);
            this.playingHistory = false;
        })
    }

    async showHistoryBySteps(field: Cell[][], history: History[]){
        const historyToShow = [...history]
        const interval = setInterval(()=>{
            console.log("showing history...")
            const currHistoryEntry = historyToShow.shift();
            if(!currHistoryEntry) {
                clearInterval(interval);
                console.log("History shown and stopped. Loading pixels...")
                this.rootStore.loadPixels()
            } else {
                let row = currHistoryEntry.row;
                let col = currHistoryEntry.col;
                let color = currHistoryEntry.color;
                field[row][col].color = color;
                console.log(`Showing history, entry ${row}:${col} - ${color}`)
            }
        }, 10);
    }
}