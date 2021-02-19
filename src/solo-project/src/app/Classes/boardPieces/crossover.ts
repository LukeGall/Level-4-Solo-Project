import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Crossover extends BoardPiece {
    position: Pos;
    type = Piece.Crossover;
    
    constructor(pos: Pos) {
        super(pos);
    }

    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y += marble.direction;
    }


    click() {
    }
}
