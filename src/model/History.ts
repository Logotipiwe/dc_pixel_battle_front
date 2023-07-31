import {Colorable} from "./Colorable";

export default class History implements Colorable {
    constructor(id, row, col, color, playerId, time) {
        this.id = id;
        this.row = row;
        this.col = col;
        this.color = color;
        this.playerId = playerId
        this.time = time
    }

    static fromDto(dto: HistoryDto){
        return new History(dto.id, dto.row, dto.column, dto.color, dto.playerId, dto.time)
    }

    id: string;
    row: number;
    col: number;
    color: string;
    playerId: string
    time: Date
}

export type HistoryDto = {
    id: string
    column: number
    row: number
    color: string
    playerId: string
    time: string
}