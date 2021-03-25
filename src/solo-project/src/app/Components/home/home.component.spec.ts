import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from '../../app-routing.module';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
      
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes(routes)],
            declarations: [HomeComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the example boards', () => {
        fixture.detectChanges();
        const debug = fixture.debugElement;
        expect(debug.queryAll(By.css('.board')).length).toEqual(4);
    })

    it('Should have link to turing tumble site', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement;
        expect(compiled.querySelector('a').textContent).toContain('Turing');
    })
});


