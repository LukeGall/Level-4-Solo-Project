import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/Classes/boardParts/board';
import { Pos } from 'src/app/Classes/boardParts/pos';
import { Piece } from 'src/app/Classes/piece.enum';
import { AssetService } from 'src/app/Shared/asset.service';
import { parseSlotString, slotsToString } from 'src/app/Shared/convert-functions';

@Component({
    selector: 'app-interactive-tutorial',
    templateUrl: './interactive-tutorial.component.html',
    styleUrls: ['./interactive-tutorial.component.scss'],
})
export class InteractiveTutorialComponent implements OnInit {
    board: Board = null;
    uploadedBoard: File = null;
    state: number = 0;
    rampsPlaced: number = 0;
    crossoversPlaced: number = 0;
    bitPlaced: number = 0;
    gearBitsPlaced: number = 0;
    gearsPlaced: number = 0;
    blueTrigger: number = 0;

    rampButton: number[] = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 17, 18];
    crossButton: number[] = [7, 17, 18];
    bitButton: number[] = [9, 10, 17, 18];
    interceptorButton: number[] = [11, 12, 17, 18];
    gearButton: number[] = [14, 15, 16, 17, 18];
    gearBitButton: number[] = [13, 14, 15, 16, 17, 18];

    stepButton: number[] = [6, 17, 18];
    playButton: number[] = [5, 6, 17, 18];
    resetBoardButton: number[] = [6, 8, 10, 12, 17, 18];
    resetMarblesButton: number[] = [8, 17, 18];

    saveButton: number[] = [17, 18];

    getPartArray(piece: Piece): number[] {
        switch (piece) {
            case Piece.Ramp:
                return this.rampButton;
            case Piece.Crossover:
                return this.crossButton;
            case Piece.Gear:
                return this.gearButton;
            case Piece.GearBit:
                return this.gearBitButton;
            case Piece.Bit:
                return this.bitButton;
            case Piece.Interceptor:
                return this.interceptorButton;
        }
        return [];
    }

    constructor(private assets: AssetService) { }

    ngOnInit(): void {
        this.board = new Board(18);
    }

    setDelete() {
        this.setHolding(Piece.Delete);
    }

    clearMarbles() {
        this.board.clearMarbles();
    }


    goBack() {
        if (this.state > 0) this.state--;
        this.rampsPlaced = 0;
        this.crossoversPlaced = 0;
        this.bitPlaced = 0;
        this.gearBitsPlaced = 0;
        this.gearsPlaced = 0;
        this.blueTrigger = 0;
    }

    saveBoard() {
        var blob = new Blob([slotsToString(this.board.slots)], { type: "text/plain;charset=utf-8" });
        saveAs(blob, "TuringTumbleBoard.txt");
        if(this.state==17) this.state++;
    }

    uploadBoard(files: FileList) {
        let input = files.item(0);
        if (input.type == "text/plain") {
            let reader = new FileReader();
            reader.onload = () => {
                var text = reader.result;
                try {
                    this.board.slots = parseSlotString(text as string);
                } catch (error) {
                    alert("Error loading file");
                }
            }
            reader.readAsText(input);
        } else {
            alert("Wrong file type");
        }
    }

    changeSpeed(value: number) {
        this.board.setSpeed(3200 - value);
    }


    increaseMarble(colour: string) {
        this.board.increaseMarble(colour);
    }

    decreaseMarble(colour: string) {
        this.board.decreaseMarble(colour);
    }

    clickedFlipper(colour: string) {
        if (colour == "blue") {
            if (this.state == 3) {
                this.state++;
            } else if (this.state == 4 && this.rampsPlaced >= 9) {
                this.state++;
            } else if (this.state == 16) {
                this.blueTrigger++;
                if (this.blueTrigger == 2) this.state++;
            }
        }
        this.board.startMarble(colour);
    }

    setHolding(piece: Piece) {
        if (this.state == 0) {
            if (piece == Piece.Ramp) this.state++;
        }
        this.board.setHeldPiece(piece);
    }

    boardStep() {
        this.board.stepForward();
    }

    triggerPlay() {
        this.board.toggle();
        if (this.state == 5) this.state++;

    }

    clearBoard() {
        this.board.resetBoard();
        switch (this.state) {
            case 6:
            case 8:
            case 10:
            case 12:
                this.state++;
                break;
            default:
                break;
        }
    }

    slotClicked(pos: Pos) {
        const changed = this.board.clickPiece(pos);
        switch (this.state) {
            case (1):
                if (pos.x == 0 && pos.y == 3 && this.board.heldPiece == Piece.Ramp) this.state++;
                break;
            case (2):
                if (pos.x == 0 && pos.y == 3 && this.board.heldPiece == Piece.Ramp) this.state++;
                break;
            case (4):
                if (this.board.heldPiece == Piece.Ramp) this.rampsPlaced++;
                break;
            case (7):
                if (this.board.heldPiece == Piece.Crossover && changed) this.crossoversPlaced++;
                if (this.crossoversPlaced == 5) this.state++;
                break;
            case (9):
                if (this.board.heldPiece == Piece.Bit && changed) this.bitPlaced++;
                if (this.bitPlaced == 6) this.state++;
                break;
            case (11):
                if (this.board.heldPiece == Piece.Interceptor && changed) this.state++;
                break;
            case (13):
                if (this.board.heldPiece == Piece.GearBit && changed) this.gearBitsPlaced++;
                if (this.gearBitsPlaced == 5) {
                    this.state++;
                    this.gearBitsPlaced = 0;
                }
                break;
            case (14):
                if (this.board.heldPiece == Piece.Gear && changed) this.gearsPlaced++;
                if (this.gearsPlaced == 3) this.state++;
                break;
            case (15):
                if (this.board.heldPiece == Piece.GearBit && !changed) this.gearBitsPlaced++;
                if (this.gearBitsPlaced == 3) this.state++;
                break;
        }

    }

    getInfo(piece: string): string {
        switch (piece) {
            case Piece.Ramp:
                return "Send the marble in the direction of the Ramp";
            case Piece.Gear:
                return "Flip the direction of any connected Gearbits";
            case Piece.Crossover:
                return "Send the marble in the direction it is already going";
            case Piece.Bit:
                return "Send the marble in the opposite direction then flip direction";
            case Piece.GearBit:
                return "Send the marble in the opposite direction, flip direction and spin any connected Gears";
            case Piece.Interceptor:
                return "Stop and catch the marble";
        }
    }

    getPic(piece: string): string {
        return this.assets.getPieceImg(piece);
    }

    private getDiff(piece: any): number {
        switch (piece) {
            case Piece.Ramp:
                return 1;
            case Piece.Gear:
                return 5;
            case Piece.Crossover:
                return 2;
            case Piece.Bit:
                return 3;
            case Piece.GearBit:
                return 6;
            case Piece.Interceptor:
                return 4;
        }
    }

    sortByDiff = (fst, snd) => {
        let fstDiff = this.getDiff(fst.key);
        let sndDiff = this.getDiff(snd.key);
        if (fstDiff > sndDiff) {
            return 1;
        } else {
            return -1;
        }
    }

}
