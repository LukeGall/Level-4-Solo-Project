import { BoardPiece } from '../boardPieces/board-piece';
import { Slot } from './slot';

export class CompSlot implements Slot {
    partName: string = "CompSlot";
    piece: BoardPiece;
    image= "assets/compslot.svg";

    constructor() {
        this.piece = null;
    }
}
