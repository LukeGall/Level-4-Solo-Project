import { Marble } from '../boardParts/marble';
import { BoardPiece } from './board-piece';

export class Gear implements BoardPiece{
    processMarble(marble: Marble) {
        throw new Error('Gear cant process a marble');
    }
    
    getName(): String {
        return "Gear";
    }
}
