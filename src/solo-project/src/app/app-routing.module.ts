import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlainBoardComponent } from './Components/plainBoard/plain-board.component';
import { MakePuzzleComponent } from './Components/make-puzzle/make-puzzle.component';
import { OnlinePuzzlesComponent } from './Components/online-puzzles/online-puzzles.component';
import { PlayPuzzleComponent } from './Components/play-puzzle/play-puzzle.component';


const routes: Routes = [
  { path:'plain-board', component: PlainBoardComponent},
  { path: 'make-puzzle', component: MakePuzzleComponent},
  { path: 'online-puzzle', component: OnlinePuzzlesComponent},
  { path: '', redirectTo: '/plain-board',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
