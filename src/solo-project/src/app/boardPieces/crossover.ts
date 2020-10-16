import { Marble } from '../boardParts/marble';
import { BoardPiece } from './board-piece';

export class Crossover implements BoardPiece{
    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y += marble.direction;
    }

    getName(): String {
        return "CO";
    }

}
