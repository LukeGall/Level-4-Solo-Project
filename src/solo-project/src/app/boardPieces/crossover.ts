import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { BoardPiece } from './board-piece';

export class Crossover implements BoardPiece{
    position: Pos;
    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y += marble.direction;
    }

    getName(): String {
        return "CO";
    }

    constructor(position:Pos){
        this.position = position;
    }

}
