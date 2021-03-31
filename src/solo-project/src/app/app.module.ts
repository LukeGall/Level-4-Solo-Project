import { NgModule } from '@angular/core';
// Firebase imports
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
// Mat components
import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SlotBackgroundPipe } from 'src/app/Classes/slotPipe';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './Components/board/board.component';
import { CollectedMarblesComponent } from './Components/boardPieceComponents/collected-marbles/collected-marbles.component';
import { DispenserComponent } from './Components/boardPieceComponents/dispensor/dispenser.component';
import { FlipperComponent } from './Components/boardPieceComponents/flipper/flipper.component';
import { PieceComponent } from './Components/boardPieceComponents/piece/piece.component';
import { DefaultPuzzlesComponent } from './Components/default-puzzles/default-puzzles.component';
import { HomeComponent } from './Components/home/home.component';
import { InteractiveTutorialComponent } from './Components/interactive-tutorial/interactive-tutorial.component';
import { MakePuzzleComponent } from './Components/make-puzzle/make-puzzle.component';
import { OnlinePuzzlesComponent } from './Components/online-puzzles/online-puzzles.component';
// Created Components
import { PlainBoardComponent } from './Components/plainBoard/plain-board.component';
import { PlayPuzzleComponent } from './Components/play-puzzle/play-puzzle.component';
import { PromptCardComponent } from './Components/prompt-card/prompt-card.component';
import { PuzzleCardComponent } from './Components/puzzle-card/puzzle-card.component';
import { PuzzleListComponent } from './Components/puzzle-list/puzzle-list.component';
import { SelectionBarComponent } from './Components/selection-bar/selection-bar.component';
import { SidenavComponent } from './Components/sidenav/sidenav.component';
import { SlotComponent } from './Components/slot/slot.component';
import { TutorialComponent } from './Components/tutorial/tutorial.component';






@NgModule({
  declarations: [
    AppComponent,
    PlainBoardComponent,
    SelectionBarComponent,
    DispenserComponent,
    FlipperComponent,
    SidenavComponent,
    CollectedMarblesComponent,
    PieceComponent,
    MakePuzzleComponent,
    BoardComponent,
    PromptCardComponent,
    OnlinePuzzlesComponent,
    PlayPuzzleComponent,
    PuzzleCardComponent,
    DefaultPuzzlesComponent,
    TutorialComponent,
    HomeComponent,
    PuzzleListComponent,
    SlotComponent,
    InteractiveTutorialComponent,
    SlotBackgroundPipe,
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
    AngularFireAuthModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTableModule,
  ],
  providers: [AngularFireDatabase],
  bootstrap: [AppComponent]
})
export class AppModule { }
