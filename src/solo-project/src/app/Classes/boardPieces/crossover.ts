import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Crossover extends BoardPiece {
    imgLink: string = "assets/crossover.svg";
    imgBlueMarble = "assets/crossover-blue.svg";
    imgRedMarble = "assets/crossover-red.svg";
    position: Pos;
    type = Piece.Crossover;
    info = "Send marble in the position it is already going"
    
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
