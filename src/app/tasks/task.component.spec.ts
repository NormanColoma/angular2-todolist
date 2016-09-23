import { Observable } from 'rxjs';
import { StubTaskService } from './../../testing/task.service.stub';
import { HttpModule } from '@angular/http';
import { TasksComponent } from './tasks.component';
import { Task } from './../tasks/task';
import { TaskService } from './../core/tasks.service';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';

describe('Tasks Component', () => {
    let component: TasksComponent;
    let fixture: ComponentFixture<TasksComponent>;
    let taskService: TaskService;
    let spy;
    let fakeTasks: Task[];

    describe('Using stubs', () => {
        beforeEach(async(() => {

            // Configure and create the component
            TestBed.configureTestingModule({
                imports: [HttpModule],
                declarations: [TasksComponent],
                providers: [{ provide: TaskService, useClass: StubTaskService }]
            })
                .compileComponents();

            //Get the component
            fixture = TestBed.createComponent(TasksComponent);
            component = fixture.componentInstance;

            //Get the service injected in the component
            taskService = fixture.debugElement.injector.get(TaskService);
        }));

        it('should get the tasks', async(() => {
            let stub = new StubTaskService();  //Have a look at testing/task.service.stub.ts file
            fixture.detectChanges();          // trigger data binding

            //Wait for async operation
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks).toEqual(stub.fakeTasks);
            });
        }));
    });

    describe('Using spies', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule],
                declarations: [TasksComponent],
                providers: [TaskService]
            })
                .compileComponents();
            fixture = TestBed.createComponent(TasksComponent);
            component = fixture.componentInstance;

            taskService = fixture.debugElement.injector.get(TaskService);
            fakeTasks = [
                {
                    '_id': '57e1699cd09bf01ccd5d1442',
                    'name': 'first task',
                    'description': 'This is the first task',
                    'author': 'Norman',
                    'created_at': new Date('2016-09-20T16:53:48.668Z'),
                    'pending': true
                },
                {
                    '_id': '57e16a1055808a1d88211492',
                    'name': 'second task',
                    'description': 'This is the second task',
                    'author': 'Norman',
                    'created_at': new Date('2016-09-20T16:55:44.963Z'),
                    'pending': true
                }
            ];
            //Configure the spy on the service. When calling getTasks return fakeTasks.
            spy = spyOn(taskService, 'getTasks')
                .and.returnValue(Observable.of(fakeTasks));
        }));

        it('should get the tasks', async(() => {
            let stub = new StubTaskService();
            fixture.detectChanges();          // trigger data binding

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks).toEqual(stub.fakeTasks);
            });
        }));
    });
});
