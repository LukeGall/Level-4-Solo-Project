import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { RouterTestingModule } from '@angular/router/testing';
import { MakePuzzleComponent } from './make-puzzle.component';
import { MakePuzzleService } from 'src/app/Shared/make-puzzle.service';
import { AngularFireAuth } from '@angular/fire/auth';

describe('MakePuzzleComponent', () => {
  let component: MakePuzzleComponent;
  let fixture: ComponentFixture<MakePuzzleComponent>;
  const stub = {
    collection: (name: string) => {
      doc: (_id: string) => ({
        set: (_d: any) => new Promise((resolve, _reject) => resolve()),
      })
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ MakePuzzleComponent ],
      providers: [MakePuzzleService, {provide: AngularFireAuth, useValue: stub}, {provide: AngularFireDatabase, useValue: stub}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakePuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
