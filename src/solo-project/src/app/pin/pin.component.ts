import { Component, OnInit } from '@angular/core';
import { Pin } from '../boardParts/pin';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {
  pin: Pin = new Pin();

  constructor() { }

  ngOnInit(): void {
  }

}
