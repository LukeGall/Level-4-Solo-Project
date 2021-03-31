import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SlotBackgroundPipe } from 'src/app/Classes/slotPipe'
import { InteractiveTutorialComponent } from './interactive-tutorial.component';

describe('InteractiveTutorialComponent', () => {
  let component: InteractiveTutorialComponent;
  let fixture: ComponentFixture<InteractiveTutorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractiveTutorialComponent, SlotBackgroundPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractiveTutorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
