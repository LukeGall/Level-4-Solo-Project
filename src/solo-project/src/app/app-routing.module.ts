import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlainBoardComponent } from './Components/plainBoard/plain-board.component';
import { MakePuzzleComponent } from './Components/make-puzzle/make-puzzle.component';


const routes: Routes = [
  { path:'plain-board', component: PlainBoardComponent},
  { path: 'make-puzzle', component: MakePuzzleComponent},
  { path: '', redirectTo: '/plain-board',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
