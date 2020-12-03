import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Ramp extends BoardPiece {
    direction: Direction;
    position: Pos;
    imgLink: string = "../../../assets/ramp.svg";
    imgBlueMarble = "../../../assets/ramp-blue.svg"
    imgRedMarble = "../../../assets/ramp-red.svg"

    type=Piece.Ramp;
    info="Send the marble in the direction of the Ramp"

    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y += this.direction;
        marble.direction = this.direction;
    }

    constructor(direction: Direction, position: Pos) {
        super(position);
        this.direction = direction;
    }


    getTxtDisplay(): string {
        return "" + this.direction;
    }

    click() {
        this.changeDirection();
    }


    private changeDirection() {
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }
}
