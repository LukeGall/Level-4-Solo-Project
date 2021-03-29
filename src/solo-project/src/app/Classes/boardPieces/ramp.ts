import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Ramp extends BoardPiece {
    direction: Direction;
    position: Pos;
    type = Piece.Ramp;

    constructor(direction: Direction, position: Pos) {
        super(position);
        this.direction = direction;
    }

    processMarble(marble: Marble) : any[]{
        marble.position.x += 1;
        marble.position.y += this.direction;
        marble.direction = this.direction;

        let newMarble = new Marble();
        Object.assign(newMarble, marble);

        return [this, newMarble];
    }



    click() {
        this.switchDirection();
        return true;
    }


    private switchDirection() {
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }
}
