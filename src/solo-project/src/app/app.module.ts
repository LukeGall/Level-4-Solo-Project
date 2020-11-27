import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlainBoardComponent } from './Components/plainBoard/plain-board.component';
import { PinComponent } from './Components/pin/pin.component';
import { CompSlotComponent } from './Components/comp-slot/comp-slot.component';
import { SelectionBarComponent } from './Components/selection-bar/selection-bar.component';
import { DispenserComponent } from './Components/boardPieceComponents/dispensor/dispenser.component';
import { FlipperComponent } from './Components/boardPieceComponents/flipper/flipper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { CollectedMarblesComponent } from './Components/boardPieceComponents/collected-marbles/collected-marbles.component';
import { PieceComponent } from './Components/boardPieceComponents/piece/piece.component';
import { MakePuzzleComponent } from './Components/make-puzzle/make-puzzle.component';
import { ConfirmationComponent } from './Components/confirmation/confirmation.component';
import { BoardComponent } from './Components/board/board.component';
import { MatCardModule } from '@angular/material/card';
import { PromptCardComponent } from './Components/prompt-card/prompt-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from "@angular/forms";
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { OnlinePuzzlesComponent } from './Components/online-puzzles/online-puzzles.component';
import { PlayPuzzleComponent } from './Components/play-puzzle/play-puzzle.component';
import { PuzzleCardComponent } from './Components/puzzle-card/puzzle-card.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database'
import { environment } from '../environments/environment';
import { DefaultPuzzlesComponent } from './Components/default-puzzles/default-puzzles.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list'; 
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    AppComponent,
    PlainBoardComponent,
    PinComponent,
    CompSlotComponent,
    SelectionBarComponent,
    DispenserComponent,
    FlipperComponent,
    SidenavComponent,
    CollectedMarblesComponent,
    PieceComponent,
    MakePuzzleComponent,
    ConfirmationComponent,
    BoardComponent,
    PromptCardComponent,
    OnlinePuzzlesComponent,
    PlayPuzzleComponent,
    PuzzleCardComponent,
    DefaultPuzzlesComponent
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
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatTooltipModule,
    MatExpansionModule,
    MatTabsModule,
    MatListModule,
    MatPaginatorModule,
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
