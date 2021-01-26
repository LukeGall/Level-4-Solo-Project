import { BoardPiece } from '../boardPieces/board-piece';
import { Slot } from './slot'

export class Pin implements Slot {
    partName: string = "Pin";
    piece: BoardPiece = null;
    image = "assets/pin.svg";

    constructor() {
    }
}
