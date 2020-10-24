import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { BoardPiece } from './board-piece';

export class Gear implements BoardPiece{
    position: Pos;
    processMarble(marble: Marble) {
        throw new Error('Gear cant process a marble');
    }
    
    getName(): String {
        return "Gear";
    }

    constructor(){
    }
}
