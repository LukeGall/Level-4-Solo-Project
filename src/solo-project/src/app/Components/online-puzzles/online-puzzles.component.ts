import { Component, OnInit, } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-online-puzzles',
  templateUrl: './online-puzzles.component.html',
  styleUrls: ['./online-puzzles.component.scss']
})
export class OnlinePuzzlesComponent implements OnInit {

  constructor(public auth: AngularFireAuth) {

  }

  ngOnInit(): void {
  }
}
