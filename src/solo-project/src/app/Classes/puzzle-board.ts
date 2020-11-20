import { Board } from './boardParts/board';
import { Marble } from './boardParts/marble';
import { MarblePair } from './boardParts/marblePair';
import { Pos } from './boardParts/pos';
import { Slot } from './boardParts/slot';
import { Piece } from './piece.enum';

export class PuzzleBoard extends Board {
    private startingSlots: Slot[][];
    private solutionSlot: Slot[][];
    private expectedResults: MarblePair[];
    private editing: boolean = true;
    private correctResults: boolean = false;

    constructor() {
        super(0);
        for (const pair of this.boardPieces) {
            this.boardPieces[pair[0]] = 0;
        }
    }

    increaseMarble(colour: string) {
        if (this.editing) {
            super.increaseMarble(colour);
        }
    }

    decreaseMarble(colour: string) {
        if (this.editing) {
            super.decreaseMarble(colour);
        }
    }

    confirmedStartingSlots() {
        if (this.editing) {
            this.startingSlots = [...this.slots];
            for (var i = 0; i < this.startingSlots.length; i++) {
                var rowOfSlots: Slot[] = this.startingSlots[i];
                for (var j = 0; j < rowOfSlots.length; j++) {
                    rowOfSlots[j].piece.lock();
                }
            }
        }
    }

    confirmBoard() {
        if (this.editing) {
            this.editing = false;
            this.solutionSlot = [...this.slots];
            this.expectedResults = [...this.collectedMarbles];
        }
    }

    showAnswer() {
        this.slots = [...this.solutionSlot];
    }

    clearPieces() {
        this.slots = [...this.startingSlots];
    }

    clickPiece(pos: Pos): boolean {
        console.log("Create piece - puzzle board")
        let changed = false;
        if (this.editing) {
            if (this.heldPiece != Piece.Delete)
                this.boardPieces[this.heldPiece]++;
            changed = super.clickPiece(pos);
        } else {
            const slot = this.slots[pos.x][pos.y];
            if (this.heldPiece == Piece.Delete && !slot.piece.locked) {
                this.boardPieces[slot.piece.type]++;
                slot.piece = null;
                changed = true;
            }
            else if (this.boardPieces[this.heldPiece] != 0 && !slot.piece.locked) {
                if (super.clickPiece(pos)) {
                    this.boardPieces[this.heldPiece]--;
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
}
