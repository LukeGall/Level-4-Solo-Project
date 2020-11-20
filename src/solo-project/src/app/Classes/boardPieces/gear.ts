import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';
import { Piece } from '../piece.enum';
import { BoardPiece } from './board-piece';

export class Gear extends BoardPiece{
    position: Pos;
    imgLink: string = "../../../assets/gear.svg";;
    type=Piece.Gear;
    processMarble(marble: Marble) {
        throw new Error('Gear cant process a marble');
    }
    
    constructor(position: Pos){
        super(position);
    }

    getTxtDisplay(): string {
        return "G";
    }

    click() {
        console.log("Gear clicked");
    }

}
