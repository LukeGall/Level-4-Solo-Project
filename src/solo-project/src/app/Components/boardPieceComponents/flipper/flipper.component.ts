import { Component, Input, OnInit } from '@angular/core';
import { BoardService } from 'src/app/board.service';

@Component({
  selector: 'app-flipper',
  templateUrl: './flipper.component.html',
  styleUrls: ['./flipper.component.scss']
})
export class FlipperComponent implements OnInit {
  @Input() colour: string;

  constructor(private boardService: BoardService) { }

  ngOnInit(): void {
  }

  trigger(){
    this.boardService.startMarble(this.colour);
  }

}
