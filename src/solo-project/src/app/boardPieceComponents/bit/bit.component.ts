import { Component, Input, OnInit } from '@angular/core';
import { Bit } from 'src/app/boardPieces/bit';

@Component({
  selector: 'app-bit',
  templateUrl: './bit.component.html',
  styleUrls: ['./bit.component.scss']
})
export class BitComponent implements OnInit {
  @Input() bit: Bit;
  
  constructor() { }

  ngOnInit(): void {
  }

}
