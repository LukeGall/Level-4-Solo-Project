import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { BoardPiece } from './board-piece';

export class Bit implements BoardPiece{
    direction : Direction;
    position: Pos;

    constructor(direction: Direction, position: Pos){
        this.direction  = direction;
        this.position = position;
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
