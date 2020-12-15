import { Board } from './boardParts/board';
import { Marble } from './boardParts/marble';
import { MarblePair } from './boardParts/marblePair';
import { Pos } from './boardParts/pos';
import { Slot } from './boardParts/slot';
import { BoardPiece } from './boardPieces/board-piece';
import { Piece } from './piece.enum';
import { cloneDeep } from 'lodash';

export class PuzzleBoard extends Board {
    startingSlots: Slot[][] = new Array<Slot[]>();
    solutionSlot: Slot[][] = new Array<Slot[]>();
    expectedResults: MarblePair[] = new Array<MarblePair>();
    boardState: boardState = boardState.starting;
    correctResults: boolean = false;
    startingBlueMarbles: Marble[] = new Array<Marble>();
    startingRedMarbles: Marble[] = new Array<Marble>();
    startingPieces: any = new Map<Piece, number>();


    constructor() {
        super(0);
        for (const pair of this.boardPieces) {
            this.boardPieces.set(pair[0], 0);
        }
    }

    increaseMarble(colour: string) {
        if (this.boardState != boardState.playing) {
            super.increaseMarble(colour);
            this.cloneMarbles(colour);
        }
    }

    private cloneMarbles(colour: string) {
        if (colour == "blue") {
            this.startingBlueMarbles = cloneDeep(this.blueMarbles);
        } else {
            this.startingRedMarbles = cloneDeep(this.redMarbles);
        }
    }

    decreaseMarble(colour: string) {
        if (this.boardState != boardState.playing) {
            super.decreaseMarble(colour);
            this.cloneMarbles(colour);
        }
    }

    confirmedStartingSlots() {
        // Lock all the pieces so they can't be changed by a player
        if (this.boardState == boardState.starting) {
            for (var i = 0; i < this.slots.length; i++) {
                var rowOfSlots: Slot[] = this.slots[i];
                for (var j = 0; j < rowOfSlots.length; j++) {
                    let slot = rowOfSlots[j];
                    if (slot && slot.piece) {
                        rowOfSlots[j].piece.lock();
                    }
                }
            }
        }
        this.startingSlots = cloneDeep(this.slots);
        this.boardState = boardState.solutionMaking;
    }

    confirmBoard() {
        if (this.boardState == boardState.solutionMaking) {
            this.boardState = boardState.done;

            this.solutionSlot = cloneDeep(this.slots);
            this.slots = cloneDeep(this.startingSlots);

            this.startingPieces = cloneDeep(this.boardPieces);

            this.expectedResults = cloneDeep(this.collectedMarbles);
            this.collectedMarbles = new Array<MarblePair>();
            this.blueMarbles = cloneDeep(this.startingBlueMarbles);
            this.redMarbles = cloneDeep(this.startingRedMarbles);

            this.heldPiece = Piece.Delete;
            console.log(this);
        }
    }

    showAnswer() {
        this.slots = cloneDeep(this.solutionSlot);
    }

    resetBoard() {
        // If playing reset to the starting slots, otherwise reset as normal 
        this.inPlayMarble = null;
        this.collectedMarbles = new Array<MarblePair>();
        if (this.boardState != boardState.starting) {
            this.slots = cloneDeep(this.startingSlots);
            if (this.boardState == boardState.solutionMaking) {
                for (const pair of this.boardPieces) {
                    this.boardPieces.set(pair[0], 0);
                }
            } else if (this.boardState == boardState.playing) {
                this.boardPieces = cloneDeep(this.startingPieces);
                this.blueMarbles = cloneDeep(this.startingBlueMarbles);
                this.redMarbles = cloneDeep(this.startingRedMarbles)
            }
        }
    }

    clearMarbles() {
        super.clearMarbles();
        this.blueMarbles = cloneDeep(this.startingBlueMarbles);
        this.redMarbles = cloneDeep(this.startingRedMarbles);
    }

    clickPiece(pos: Pos): boolean {
        // Three main states for a puzzle, starting slot placement
        // Making solution and playing the puzzle
        let changed = false;
        if (this.boardState == boardState.starting) {
            super.clickPiece(pos);
        }
        else if (this.boardState == boardState.solutionMaking) {
            // After set up
            let orgPiece: BoardPiece = this.slots[pos.x][pos.y].piece;
            changed = super.clickPiece(pos);
            // Need to update how many pieces a player will have
            if (changed) {
                if (this.heldPiece != Piece.Delete) {
                    this.changePieceAmount(this.heldPiece, 1);
                }
                if (orgPiece) {
                    this.changePieceAmount(orgPiece.type, -1);
                    this.collectedMarbles = new Array<MarblePair>();
                }
            }
        } else {
            // Playing board will need to update number of pieces the player has left
            const slot = this.slots[pos.x][pos.y];
            let orgPiece: BoardPiece = slot.piece;
            changed = super.clickPiece(pos);
            if (changed) {
                if (this.heldPiece != Piece.Delete) {
                    if (this.boardPieces.get(this.heldPiece) == 0) {
                        slot.piece = null;
                        changed = false;
                    } else {
                        this.changePieceAmount(this.heldPiece, -1);
                    }
                }
                if (orgPiece) {
                    this.changePieceAmount(orgPiece.type, 1);
                }
            }
        }

        return changed;
    }

    protected updateList(marble: Marble) {
        // An extra check to check solution of board
        super.updateList(marble);
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
    done = "Set title, description, and difficulty",
    playing = "Playing the puzzle"
};
