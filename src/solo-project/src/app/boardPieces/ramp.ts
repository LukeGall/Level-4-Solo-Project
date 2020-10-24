import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { BoardPiece } from './board-piece';

export class Ramp implements BoardPiece{
    direction: Direction;
    position: Pos;

    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y += this.direction;
        marble.direction = this.direction;
    }

    getName(): String {
        return "Ramp";
    }

    constructor(direction: Direction, position: Pos){
        this.direction = direction;
        this.position = position;
    }

    changeDirection(){
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }
}
