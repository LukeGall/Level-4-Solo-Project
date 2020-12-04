import { Direction } from '../boardParts/direction';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Interceptor extends BoardPiece{
    imgLink: string = "assets/interceptor.svg";
    imgBlueMarble = "assets/interceptor-blue.svg"
    imgRedMarble = "assets/interceptor-red.svg"

    type=Piece.Interceptor;
    info="Stop and catch the marble"

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
