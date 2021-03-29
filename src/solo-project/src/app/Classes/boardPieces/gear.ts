import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Gear extends BoardPiece {
    position: Pos;
    type = Piece.Gear;

    constructor(position: Pos) {
        super(position);
    }

    processMarble(marble: Marble): any[] {
        marble.direction = Direction.stopped;
        marble.position.x = -5;
        marble.position.y = -5;

        return [null,null];
    }

    click() {
        return false;
    }

}
