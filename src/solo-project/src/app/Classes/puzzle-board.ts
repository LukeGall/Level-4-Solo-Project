import { Board } from './boardParts/board';
import { Marble } from './boardParts/marble';
import { MarblePair } from './boardParts/marblePair';
import { Pos } from './boardParts/pos';
import { Slot } from './boardParts/slot';
import { BoardPiece } from './boardPieces/board-piece';
import { Piece } from './piece.enum';
import { cloneDeep } from 'lodash';
import { parseSlotString, slotsToString } from '../Shared/convert-functions';

export class PuzzleBoard extends Board {
    startingSlots: string;
    solutionSlot: string;
    expectedResults: MarblePair[] = new Array<MarblePair>();
    boardState: boardState = boardState.starting;
    correctResults: boolean = false;
    startingBlueMarbles: number = 0;
    startingRedMarbles: number = 0;
    // To allow type conversion when uploading
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
            this.startingBlueMarbles = this.blueMarbles;
        } else {
            this.startingRedMarbles = this.redMarbles;
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
        this.startingSlots = slotsToString(this.slots);
        this.boardState = boardState.solutionMaking;
    }

    confirmBoard() {
        if (this.boardState == boardState.solutionMaking) {
            this.boardState = boardState.done;

            this.solutionSlot = slotsToString(this.slots);

            // this.slots = parseSlotString(this.startingSlots);
            // this.collectedMarbles = new Array<MarblePair>();
            // this.heldPiece = Piece.Delete;

            this.startingPieces = cloneDeep(this.boardPieces);

            this.expectedResults = cloneDeep(this.collectedMarbles);
            // this.blueMarbles = this.startingBlueMarbles;
            // this.redMarbles = this.startingRedMarbles;
        }
    }

    showAnswer() {
        this.slots = parseSlotString(this.solutionSlot);
    }

    goBackToStarting() {
        this.boardState = boardState.starting;
        this.slots = parseSlotString(this.startingSlots);
        for (const pair of this.boardPieces) {
            this.boardPieces.set(pair[0], 0);
        }
    }

    goBackToSolution(){
        this.boardState = boardState.solutionMaking;
    }

    resetBoard() {
        // If playing reset to the starting slots, otherwise reset as normal 
        this.inPlayMarble = null;
        this.collectedMarbles = new Array<MarblePair>();
        if (this.boardState != boardState.starting) {
            this.slots = parseSlotString(this.startingSlots);
            this.slots.forEach((row) => {
                row.forEach((slot) => {
                    if (slot && slot.piece) {
                        slot.piece.lock();
                    }
                })
            })
            if (this.boardState == boardState.solutionMaking) {
                for (const pair of this.boardPieces) {
                    this.boardPieces.set(pair[0], 0);
                }
            } else if (this.boardState == boardState.playing) {
                this.boardPieces = cloneDeep(this.startingPieces);
                this.blueMarbles = this.startingBlueMarbles;
                this.redMarbles = this.startingRedMarbles;
            }
        }
    }

    clearMarbles() {
        super.clearMarbles();
        this.blueMarbles = this.startingBlueMarbles;
        this.redMarbles = this.startingRedMarbles;
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
