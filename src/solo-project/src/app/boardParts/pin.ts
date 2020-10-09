import { BoardPiece } from '../boardPieces/board-piece';
import {Slot} from './slot'

export class Pin implements Slot{
    partName:String = "Pin";
    piece: BoardPiece= null;

    constructor(){
    }
}
