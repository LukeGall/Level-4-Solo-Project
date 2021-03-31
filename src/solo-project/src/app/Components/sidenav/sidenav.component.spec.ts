import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavComponent } from './sidenav.component';
import { routes } from '../../app-routing.module';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  const stub = {
    user: of(true),
    collection: (name: string) => {
      doc: (_id: string) => ({
        valueChanges: () => new BehaviorSubject({foo: 'bar'}),
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      })
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [ SidenavComponent ],
      providers: [{provide: AngularFireDatabase, useValue: stub},{provide: AngularFireAuth, useValue: stub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have profile options',()=>{
    let debug = fixture.debugElement;
    let profileOptions: HTMLElement = debug.query(By.css('#profileOptions')).nativeElement;
    let listOfButtons : NodeList = profileOptions.querySelectorAll('button');
    
    expect(listOfButtons[0].textContent).toContain("Logout", 'Should have a log in button');
  })

  it('should have plain board button',()=>{
    let debug = fixture.debugElement;
    let profileOptions: HTMLElement = debug.query(By.css('#plainBoard')).nativeElement;
    let button = profileOptions.querySelector('button');
    
    expect(button.textContent).toContain("Plain Board", 'Should have a Plain board button');
  })

  it('should have Original puzzles button',()=>{
    let debug = fixture.debugElement;
    let profileOptions: HTMLElement = debug.query(By.css('#puzzles')).nativeElement;
    let button = profileOptions.querySelector('button');
    
    expect(button.textContent).toContain("Original Puzzles", 'Should have a Original Puzzles button');
  })

  it('should have Online Puzzles button',()=>{
    let debug = fixture.debugElement;
    let profileOptions: HTMLElement = debug.query(By.css('#onlinePuzzles')).nativeElement;
    let button = profileOptions.querySelector('button');
    
    expect(button.textContent).toContain("Online Puzzles", 'Should have a Online Puzzles button');
  }) 
  
  it('should have Make puzzles button',()=>{
    let debug = fixture.debugElement;
    let profileOptions: HTMLElement = debug.query(By.css('#makePuzzle')).nativeElement;
    let button = profileOptions.querySelector('button');
    
    expect(button.textContent).toContain("Create Puzzle", 'Should have a Create puzzle button');
  })
});
