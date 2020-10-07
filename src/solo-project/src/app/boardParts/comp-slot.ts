import { BoardPiece } from '../boardPieces/board-piece';
import { Slot } from './slot';

export class CompSlot implements Slot{
    partName:String = "CompSlot";
    piece:BoardPiece;

    constructor(){
        this.piece = null;
    }
}
