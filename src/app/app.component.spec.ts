import { RouterLinkStubDirective, RouterOutletStubComponent } from './../testing/router-stubs';
import { AppComponent } from './app.component';
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { DebugElement }    from '@angular/core';
import { By }              from '@angular/platform-browser';

describe('Component: Dashboard', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let element: DebugElement;
  let linkDes;
  let links;

  describe('AppComponent', () => {

    //Configure and creates the component
    beforeEach(() => {

      TestBed.configureTestingModule({
        declarations: [
            AppComponent,
            RouterLinkStubDirective, //Stub links 
            RouterOutletStubComponent //Stub RouterOutlet
            ],
      });

      fixture = TestBed.createComponent(AppComponent);

      component = fixture.componentInstance;

      element = fixture.debugElement.query(By.css('.app-title'));

    });

    //Getting the RouterOutlet links
    beforeEach(() => {
      // trigger initial data binding
      fixture.detectChanges();

      // find DebugElements with an attached RouterLinkStubDirective
      linkDes = fixture.debugElement
        .queryAll(By.directive(RouterLinkStubDirective));

      // get the attached link directive instances using the DebugElement injectors
      links = linkDes
        .map(de => de.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
    });

    it('should display component title', () => {
        fixture.detectChanges(); // trigger data binding
        expect(element.nativeElement.textContent).toContain(component.title);
    });


    it('can get RouterLinks from template', () => {
      expect(links.length).toBe(2, 'should have 2 links');
      expect(links[0].linkParams).toBe('/dashboard');
      expect(links[1].linkParams).toBe('/tasks/new');
    });

    it('can click link in the template', () => {
      const addTaskLinkDe = linkDes[1];
      const addTaskLink = links[1];

      expect(addTaskLink.navigatedTo).toBeNull();

      addTaskLinkDe.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(addTaskLink.navigatedTo).toBe('/tasks/new');
    });


  });
});
