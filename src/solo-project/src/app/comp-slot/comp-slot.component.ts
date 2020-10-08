import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-slot',
  templateUrl: './comp-slot.component.html',
  styleUrls: ['./comp-slot.component.scss']
})
export class CompSlotComponent implements OnInit {
text:String= "CS";

  constructor() { }

  ngOnInit(): void {
  }

  clicked(){
    if (this.text == "CS"){
      this.text = "click";
    } else {
      this.text = "CS";
    }
  }
}
