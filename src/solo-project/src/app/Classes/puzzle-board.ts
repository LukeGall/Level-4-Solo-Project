import { Board } from './boardParts/board';
import { Marble } from './boardParts/marble';
import { MarblePair } from './boardParts/marblePair';
import { Pos } from './boardParts/pos';
import { Slot } from './boardParts/slot';
import { BoardPiece } from './boardPieces/board-piece';
import { Piece } from './piece.enum';

export class PuzzleBoard extends Board {
    private startingSlots: Slot[][];
    private solutionSlot: Slot[][];
    private expectedResults: MarblePair[];
    boardState: boardState = boardState.starting;
    correctResults: boolean = false;

    constructor() {
        super(0);
        for (const pair of this.boardPieces) {
            this.boardPieces.set(pair[0], 0);
        }
    }

    increaseMarble(colour: string) {
        if (this.boardState != boardState.done) {
            super.increaseMarble(colour);
        }
    }

    decreaseMarble(colour: string) {
        if (this.boardState != boardState.done) {
            super.decreaseMarble(colour);
        }
    }

    confirmedStartingSlots() {
        if (this.boardState == boardState.starting) {
            this.startingSlots = [...this.slots];
            for (var i = 0; i < this.startingSlots.length; i++) {
                var rowOfSlots: Slot[] = this.startingSlots[i];
                for (var j = 0; j < rowOfSlots.length; j++) {
                    let slot = rowOfSlots[j];
                    if (slot && slot.piece) {
                        rowOfSlots[j].piece.lock();
                    }
                }
            }
        }
        this.boardState = boardState.solutionMaking;
    }

    confirmBoard() {
        if (this.boardState == boardState.solutionMaking) {
            this.boardState = boardState.done;
            this.solutionSlot = [...this.slots];
            this.expectedResults = [...this.collectedMarbles];
            this.collectedMarbles = new Array<MarblePair>();
            console.log(this);
        }
    }

    showAnswer() {
        this.slots = [...this.solutionSlot];
    }

    clearPieces() {
        if (this.boardState != boardState.starting)
            this.slots = [...this.startingSlots];
    }

    clickPiece(pos: Pos): boolean {
        let changed = false;
        if (this.boardState == boardState.starting) {
            super.clickPiece(pos);
        }
        else if (this.boardState == boardState.solutionMaking) {
            // After set up
            let orgPiece: BoardPiece = this.slots[pos.x][pos.y].piece;
            changed = super.clickPiece(pos);
            if (changed) {
                if (this.heldPiece != Piece.Delete) {
                    this.changePieceAmount(this.heldPiece, 1);
                }
                if (orgPiece) {
                    this.changePieceAmount(orgPiece.type, -1);
                }
            }
        } else {
            // Playing board will need to deal with the option of slo
            const slot = this.slots[pos.x][pos.y];
            if (this.heldPiece == Piece.Delete && slot.piece && !slot.piece.locked) {
                this.changePieceAmount(slot.piece.type, 1);
                slot.piece = null;
                changed = true;
            }
            else if (this.boardPieces.get(this.heldPiece) != 0 && !slot.piece.locked) {
                if (super.clickPiece(pos)) {
                    this.changePieceAmount(this.heldPiece, -1);
                    changed = true;
                }
            }
        }

        return changed;
    }

    protected updateList(marble: Marble) {
        let len = this.collectedMarbles.length;
        if (len > 0 && this.collectedMarbles[len - 1].colour == marble.colour) {
            this.collectedMarbles[len - 1].amount += 1;
        } else {
            this.collectedMarbles.push(new MarblePair(1, marble.colour));
        }
        if (JSON.stringify(this.collectedMarbles) == JSON.stringify(this.expectedResults)) {
            this.correctResults = true;
            console.log("Correct");
        }
    }

    private changePieceAmount(piece: Piece, amount: number) {
        let curAmount = this.boardPieces.get(piece);
        this.boardPieces.set(piece, curAmount + amount);
    }
}

export enum boardState {
    starting = "Place Starting Pieces",
    solutionMaking = "Create and play Solution",
    done = "Finished puzzle"
};
