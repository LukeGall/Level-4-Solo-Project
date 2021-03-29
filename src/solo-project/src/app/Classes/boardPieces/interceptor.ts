import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Interceptor extends BoardPiece {
    type = Piece.Interceptor;
    position: Pos;

    constructor(pos: Pos) {
        super(pos);
    }

    processMarble(marble: Marble) : any[]{
        marble.direction = Direction.stopped;

        let newMarble = new Marble();
        Object.assign(newMarble, marble);

        return [null, newMarble];
    }

    click() {
        return false;
    }

}
