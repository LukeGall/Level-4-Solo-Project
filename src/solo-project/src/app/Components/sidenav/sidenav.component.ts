import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidenavComponent implements OnInit {

  constructor(public auth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  anonLogin(): void{
    this.auth.signInAnonymously().catch((error => {
      console.log(error.code);
      console.log(error.message);
    }));
  }

  logout() {
    this.auth.signOut();
  }

  goToPuzzles(type: string){
    this.router.navigate(['/puzzles', {path: type}]);
  }
}
