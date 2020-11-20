import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Bit extends BoardPiece{
    direction : Direction;
    imgLink: string = "../../../assets/bit.svg";;
    inPlayMarble: Marble;
    position: Pos;
    type=Piece.Bit;

    constructor(direction: Direction, position: Pos){
        super(position);
        this.direction  = direction;
    }
   

    click() {
        this.switchDirection();
    }
    
    private switchDirection(){
        this.direction = (this.direction == Direction.left) ? Direction.right : Direction.left;
    }

    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y -= this.direction;
        this.switchDirection();
        marble.direction = this.direction;

    }

    getTxtDisplay(): string {
        return ""+this.direction;
    }
}
