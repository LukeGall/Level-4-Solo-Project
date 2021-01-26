import { BoardPiece } from '../boardPieces/board-piece';

export interface Slot {
    partName: string;
    piece: BoardPiece;
    image: string;
}
