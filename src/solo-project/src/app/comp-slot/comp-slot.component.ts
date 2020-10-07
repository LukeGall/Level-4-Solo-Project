import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comp-slot',
  templateUrl: './comp-slot.component.html',
  styleUrls: ['./comp-slot.component.scss']
})
export class CompSlotComponent implements OnInit {
text:String= "compSlot";

  constructor() { }

  ngOnInit(): void {
  }

  clicked(){
    if (this.text == "compSlot"){
      this.text = "clicked";
    } else {
      this.text = "compSlot";
    }
  }

}
