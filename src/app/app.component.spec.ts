import { RouterLinkStubDirective, RouterOutletStubComponent } from './../testing/router-stubs';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';

describe('Component: Dashboard', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let element: DebugElement;

  describe('AppComponent', () => {
    beforeEach(() => {

      TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            RouterLinkStubDirective,
            RouterOutletStubComponent
            ],
      });

      fixture = TestBed.createComponent(AppComponent);

      component = fixture.componentInstance;

      element = fixture.debugElement.query(By.css('.app-title'));

    });

    it('should display component title', () => {
        fixture.detectChanges(); // trigger data binding
        expect(element.nativeElement.textContent).toContain(component.title);
    });
  });
});
