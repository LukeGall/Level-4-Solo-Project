import { Marble } from '../boardParts/marble';

export interface BoardPiece {
    getName():String;
    ProcessMarble(marble: Marble);
}
