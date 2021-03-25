import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board } from 'src/app/Classes/boardParts/board';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
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

  goToPlainBoard(num: number){
    this.router.navigate(['/plain-board', {example: num}]);
  }

}
