import {Colorable} from "./Colorable";


export default class Pixel implements Colorable {
    constructor(row: number, col: number, color: string, playerId: string) {
        this.row = row
        this.col = col
        this.color = color
        this.playerId = playerId
    }

    static fromDto(dto: PixelDto){
        return new Pixel(dto.row, dto.column, dto.color, dto.playerId)
    }

    row: number
    col: number
    color: string
    playerId: string
}

export type PixelDto = {
    row: number
    column: number
    color: string
    playerId: string
}