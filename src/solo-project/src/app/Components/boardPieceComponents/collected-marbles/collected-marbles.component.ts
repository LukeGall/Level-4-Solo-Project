import { Component, Input,  OnInit,  } from '@angular/core';
import { MarblePair } from 'src/app/Classes/boardParts/marblePair';

@Component({
  selector: 'app-collected-marbles',
  templateUrl: './collected-marbles.component.html',
  styleUrls: ['./collected-marbles.component.scss']
})
export class CollectedMarblesComponent implements OnInit {
  @Input() marbles: MarblePair[];

  constructor() { }

  ngOnInit(): void {
    
  }

  whatColour(pair:MarblePair):boolean{
    return (pair.colour == "blue") ? true : false;
  }

}

