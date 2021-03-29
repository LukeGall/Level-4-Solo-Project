import { BoardPiece } from '../boardPieces/board-piece';
import { Pos } from './pos';
import { Slot } from './slot';

export class Flipper implements Slot {
    partName: string = "Flipper";
    piece: BoardPiece = null;
    posOfDis: Pos;
    colour: string;

    constructor(posOfDis: Pos, colour: string) {
        this.posOfDis = posOfDis;
        this.colour = colour;
    }

    getPosOfDis(): Pos {
        return this.posOfDis;
    }


}
