import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class GearBit extends BoardPiece {
    direction: Direction;
    position: Pos;
    imgLink: string = "assets/gear-bit.svg";
    imgBlueMarble = "assets/gear-bit-blue.svg"
    imgRedMarble = "assets/gear-bit-red.svg"
    type = Piece.GearBit;
    info = "Send marble in opposite direction, then flip direction and spin any connected Gears"
    
    constructor(direction: Direction, position: Pos) {
        super(position);
        this.direction = direction;
    }

    switchDirection() {
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }

    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y -= this.direction;
        this.switchDirection();
        marble.direction = this.direction;
    }

    click() {
        this.switchDirection();
    }
}