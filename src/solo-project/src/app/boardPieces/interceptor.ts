import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { BoardPiece } from './board-piece';

export class Interceptor implements BoardPiece{
    position: Pos;
    processMarble(marble: Marble) {
        marble.direction = Direction.stopped;
    }

    getName(): String {
        return "Interceptor";
    }

    constructor(position: Pos){
        this.position=position;
    }
}
