import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { BoardPiece } from './board-piece';

export class Interceptor implements BoardPiece{
    processMarble(marble: Marble) {
        marble.direction = Direction.stopped;
    }

    getName(): String {
        return "Interceptor";
    }
}
