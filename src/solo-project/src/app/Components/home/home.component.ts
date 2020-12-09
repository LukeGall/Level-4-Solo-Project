import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/Classes/boardParts/board';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }
  example1: Board = new Board(6);
  example2: Board = new Board(6);
  example3: Board = new Board(6);
  example4: Board = new Board(6);

  ngOnInit(): void {
    this.example1.setExample(1);
    this.example2.setExample(2);
    this.example3.setExample(3);
    this.example4.setExample(4);
  }

}
