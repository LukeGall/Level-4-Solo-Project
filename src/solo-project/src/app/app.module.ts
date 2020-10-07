import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PinComponent } from './pin/pin.component';
import { CompSlotComponent } from './comp-slot/comp-slot.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PinComponent,
    CompSlotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
