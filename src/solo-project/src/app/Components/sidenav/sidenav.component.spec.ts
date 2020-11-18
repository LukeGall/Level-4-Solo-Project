import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidenavComponent ]
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
    
    expect(listOfButtons[0].textContent).toContain("Log in", 'Should have a log in button');
    expect(listOfButtons[1].textContent).toContain("New profile",'Should have new profile button');
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
