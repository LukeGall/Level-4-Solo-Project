import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PinComponent } from './pin/pin.component';
import { CompSlotComponent } from './comp-slot/comp-slot.component';
import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { RampComponent } from './boardPieceComponents/ramp/ramp.component';
import { CrossoverComponent } from './boardPieceComponents/crossover/crossover.component';
import { BitComponent } from './boardPieceComponents/bit/bit.component';
import { GearBitComponent } from './boardPieceComponents/gear-bit/gear-bit.component';
import { InterceptorComponent } from './boardPieceComponents/interceptor/interceptor.component';
import { DispenserComponent } from './boardPieceComponents/dispensor/dispenser.component';
import { FlipperComponent } from './boardPieceComponents/flipper/flipper.component';
import { GearComponent } from './boardPieceComponents/gear/gear.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PinComponent,
    CompSlotComponent,
    SelectionBarComponent,
    RampComponent,
    CrossoverComponent,
    BitComponent,
    GearBitComponent,
    InterceptorComponent,
    DispenserComponent,
    FlipperComponent,
    GearComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
