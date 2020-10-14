import { Component, Input, OnInit } from '@angular/core';
import { Gear } from 'src/app/boardPieces/gear';

@Component({
  selector: 'app-gear',
  templateUrl: './gear.component.html',
  styleUrls: ['./gear.component.scss']
})
export class GearComponent implements OnInit {
  @Input() gear: Gear;

  constructor() { }

  ngOnInit(): void {
  }

  spin(){
    console.log("Gear has been spun");
  }

}
