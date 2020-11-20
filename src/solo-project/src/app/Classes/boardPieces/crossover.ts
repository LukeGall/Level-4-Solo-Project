import { type } from 'os';
import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Crossover extends BoardPiece {
    imgLink: string = "../../../assets/crossover.svg";;
    inPlayMarble: Marble;
    position: Pos;
    type =Piece.Crossover;
    
    processMarble(marble: Marble) {
        marble.position.x += 1;
        marble.position.y += marble.direction;
    }

    getTxtDisplay(): string {
        return "CO";
    }

    constructor(pos: Pos) {
        super(pos);
    }

    
    click() {
        console.log("Crossover clicked");
    }
}