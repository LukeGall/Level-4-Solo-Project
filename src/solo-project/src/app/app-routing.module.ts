import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlainBoardComponent } from './Components/plainBoard/plain-board.component';
import { MakePuzzleComponent } from './Components/make-puzzle/make-puzzle.component';
import { OnlinePuzzlesComponent } from './Components/online-puzzles/online-puzzles.component';
import { DefaultPuzzlesComponent } from './Components/default-puzzles/default-puzzles.component';
import { HomeComponent } from './Components/home/home.component';
import { TutorialComponent } from './Components/tutorial/tutorial.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'plain-board', component: PlainBoardComponent },
  { path: 'make-puzzle', component: MakePuzzleComponent },
  { path: 'online-puzzle', component: OnlinePuzzlesComponent },
  { path: 'default-puzzles', component: DefaultPuzzlesComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
