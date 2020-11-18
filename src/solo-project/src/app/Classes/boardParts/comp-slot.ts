import { BoardPiece } from '../boardPieces/board-piece';
import { Slot } from './slot';

export class CompSlot implements Slot{
    partName:string = "CompSlot";
    piece:BoardPiece;

    constructor(){
        this.piece = null;
    }
}
