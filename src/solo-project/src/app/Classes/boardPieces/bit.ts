import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Bit extends BoardPiece {
    direction: Direction;
    position: Pos;
    type = Piece.Bit;

    constructor(direction: Direction, position: Pos) {
        super(position);
        this.direction = direction;
    }


    click() {
        this.switchDirection();
    }

    private switchDirection() {
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }

    processMarble(marble: Marble) : any[] {
        marble.position.x += 1;
        marble.position.y -= this.direction;
        this.switchDirection();
        marble.direction = this.direction;
        
        let newBit = new Bit(null,null);
        let newMarble = new Marble();
        Object.assign(newMarble, marble);
        Object.assign(newBit, this);

        return [newBit, newMarble];
    }
}
