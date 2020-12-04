import { TestBed, async } from '@angular/core/testing';
import { MatSidenav } from '@angular/material/sidenav';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'solo-project'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('solo-project');
  });


  it('should render turing tumble title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('span').textContent).toContain("Virtual Turing Tumble")
  });

  it('should display a link to the github', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const aElement: HTMLElement = compiled.querySelector('a');
    expect(aElement.getAttribute('href')).toContain("LukeGall");
  })

  it('The sidebar buttons shouldnt be displayed by default', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    let sidenav: NodeList = fixture.nativeElement.querySelectorAll('button');
    // Only have 2 buttons, menu and code
    expect(sidenav.length).toEqual(3);
  })
});
