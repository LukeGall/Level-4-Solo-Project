import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './Components/board/board.component';
import { PinComponent } from './Components/pin/pin.component';
import { CompSlotComponent } from './Components/comp-slot/comp-slot.component';
import { SelectionBarComponent } from './Components/selection-bar/selection-bar.component';
import { GearBitComponent } from './Components/boardPieceComponents/gear-bit/gear-bit.component';
import { DispenserComponent } from './Components/boardPieceComponents/dispensor/dispenser.component';
import { FlipperComponent } from './Components/boardPieceComponents/flipper/flipper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { CollectedMarblesComponent } from './Components/boardPieceComponents/collected-marbles/collected-marbles.component';
import { NonGbPieceComponent } from './Components/boardPieceComponents/non-gb-piece/non-gb-piece.component';
import { MakePuzzleComponent } from './Components/make-puzzle/make-puzzle.component';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    PinComponent,
    CompSlotComponent,
    SelectionBarComponent,
    GearBitComponent,
    DispenserComponent,
    FlipperComponent,
    SidenavComponent,
    CollectedMarblesComponent,
    NonGbPieceComponent,
    MakePuzzleComponent,
    ConfirmationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
