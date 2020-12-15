import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MarblePair } from 'src/app/Classes/boardParts/marblePair';
import { CollectedMarblesComponent } from './collected-marbles.component';

describe('CollectedMarblesComponent', () => {
    let component: CollectedMarblesComponent;
    let fixture: ComponentFixture<CollectedMarblesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CollectedMarblesComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CollectedMarblesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should list the pairs', () => {
        component.marbles = new Array<MarblePair>(new MarblePair(3, "blue"), new MarblePair(1, "red"));
        fixture.detectChanges();
        const pairs: HTMLElement = fixture.nativeElement.querySelector('div');
        const listOfPairs = pairs.querySelectorAll('div');
        expect(listOfPairs.length).toEqual(2);

        const bluePair = listOfPairs[0];
        expect(bluePair.className).toEqual("numCircle blue")
        expect(bluePair.textContent).toContain("3");
    })
});
