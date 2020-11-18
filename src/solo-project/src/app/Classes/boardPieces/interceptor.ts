import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { BoardPiece } from './board-piece';

export class Interceptor extends BoardPiece{
    imgLink: string = "../../../assets/interceptor.svg";;
    type="Interceptor"

    processMarble(marble: Marble) {
        marble.direction = Direction.stopped;
    }

    constructor(pos: Pos){
        super(pos);
    }
    
    position: Pos;

    getTxtDisplay(): string {
        return("IR");
    }

    click() {
        console.log("Interceptor clicked");
    }

}
