import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { BoardPiece } from './board-piece';

export class Bit implements BoardPiece{
    direction : Direction

    constructor(direction: Direction){
        this.direction  = direction;
    }

    switchDirection(){
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }

    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y -= this.direction;
        this.switchDirection();
        marble.direction = this.direction;

    }

    getName(): String {
        return "Bit";
    }
}
