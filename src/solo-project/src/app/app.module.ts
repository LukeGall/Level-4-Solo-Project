import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { PinComponent } from './pin/pin.component';
import { CompSlotComponent } from './comp-slot/comp-slot.component';
import { SelectionBarComponent } from './selection-bar/selection-bar.component';
import { GearBitComponent } from './boardPieceComponents/gear-bit/gear-bit.component';
import { DispenserComponent } from './boardPieceComponents/dispensor/dispenser.component';
import { FlipperComponent } from './boardPieceComponents/flipper/flipper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDividerModule} from '@angular/material/divider';
import { CollectedMarblesComponent } from './boardPieceComponents/collected-marbles/collected-marbles.component';
import { NonGbPieceComponent } from './boardPieceComponents/non-gb-piece/non-gb-piece.component';

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
    NonGbPieceComponent
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
