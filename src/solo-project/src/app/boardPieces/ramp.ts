import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { BoardPiece } from './board-piece';

export class Ramp implements BoardPiece{
    direction: Direction;

    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y += this.direction;
        marble.direction = this.direction;
    }

    getName(): String {
        return "Ramp";
    }

    constructor(direction: Direction){
        this.direction = direction;
    }

    changeDirection(){
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }
}
