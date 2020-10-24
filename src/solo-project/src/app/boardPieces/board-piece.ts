import { Marble } from '../boardParts/marble';
import { Pos } from '../boardParts/pos';

export interface BoardPiece {
    getName():String;
    processMarble(marble: Marble);
    position: Pos;
}
