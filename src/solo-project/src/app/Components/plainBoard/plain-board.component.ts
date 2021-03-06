import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { Board } from 'src/app/Classes/boardParts/board';
import { Piece } from 'src/app/Classes/piece.enum';
import { parseSlotString, slotsToString } from 'src/app/Shared/convert-functions';

@Component({
  selector: 'app-plain-board',
  templateUrl: './plain-board.component.html',
  styleUrls: ['./plain-board.component.scss'],
})
export class PlainBoardComponent implements OnInit {
  board: Board = null;
  uploadedBoard: File = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    const newBoard = new Board(18);
    const number = this.route.snapshot.paramMap.get('example');
    if(number){
      newBoard.setExample(Number(number));
    }
    this.board = newBoard;
  }

  setExample(examNumber: number) {
    const newBoard = new Board(18);
    newBoard.setExample(examNumber);
    this.board = newBoard;
  }

  saveBoard() {
    var blob = new Blob([slotsToString(this.board.slots)], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "TuringTumbleBoard.txt");
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
    this.board.setSpeed(3200-value);
  }


  increaseMarble(colour: string) {
    this.board.increaseMarble(colour);
  }

  decreaseMarble(colour: string) {
    this.board.decreaseMarble(colour);
  }

  clickedFlipper(colour: string) {
    this.board.startMarble(colour);
  }

  setHolding(piece: Piece) {
    this.board.setHeldPiece(piece);
  }

  boardStep() {
    this.board.stepForward();
  }

  triggerPlay() {
    this.board.toggle();
  }

  clearBoard() {
    this.board.resetBoard();
  }

}
