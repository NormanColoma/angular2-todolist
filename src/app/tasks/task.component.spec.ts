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
        let stub: StubTaskService; // Have a look at testing/task.service.stub.ts file

        beforeEach(async(() => {

            // Configure and create the component
            TestBed.configureTestingModule({
                imports: [HttpModule],
                declarations: [TasksComponent],
                providers: [{ provide: TaskService, useClass: StubTaskService }]
            })
                .compileComponents();

            // Get the component
            fixture = TestBed.createComponent(TasksComponent);
            component = fixture.componentInstance;

            // Get the service injected in the component
            taskService = fixture.debugElement.injector.get(TaskService);
            stub = new StubTaskService();
        }));

        it('should get the tasks', async(() => {

            fixture.detectChanges();          // trigger data binding

            // Wait for async operation
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks).toEqual(stub.fakeTasks);
            });
        }));

        it('should delete the task', async(() => {
            fakeTasks = [
                {
                    '_id': '57e16a1055808a1d88211492',
                    'name': 'second task',
                    'description': 'This is the second task',
                    'author': 'Norman',
                    'created_at': new Date('2016-09-20T16:55:44.963Z'),
                    'pending': true
                }
            ];
            fixture.detectChanges();          // trigger data binding

            component.deleteTask('57e1699cd09bf01ccd5d1442');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks.length).toEqual(1);
                expect(component.tasks).toEqual(fakeTasks);
            });
        }));

        it('should not delete the task when not found', async(() => {
            fixture.detectChanges();          // trigger data binding

            component.deleteTask('57e1699cd001cc442');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks.length).toEqual(2);
            });
        }));

        it('should throw exception when error ocurred while deleting a task', async(() => {
            let error = 'There was an error while deleting the task';
            fixture.detectChanges();          // trigger data binding

            component.deleteTask('57e16a1055808a1d88211492');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks.length).toEqual(2);
                expect(component.errorMessage).toEqual(error);
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
            // Configure the spy on the service. When calling getTasks return fakeTasks.
            spy = spyOn(taskService, 'getTasks')
                .and.returnValue(Observable.of(fakeTasks));
        }));

        it('should get the tasks', async(() => {
            fixture.detectChanges();          // trigger data binding

            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks).toEqual(fakeTasks);
            });
        }));

        it('should delete the task', async(() => {
            // Spy on the deleteTask method
            spy = spyOn(taskService, 'deleteTask')
                .and.returnValue(Observable.of(true));
            fakeTasks = [
                {
                    '_id': '57e16a1055808a1d88211492',
                    'name': 'second task',
                    'description': 'This is the second task',
                    'author': 'Norman',
                    'created_at': new Date('2016-09-20T16:55:44.963Z'),
                    'pending': true
                }
            ];
            fixture.detectChanges();          // trigger data binding

            component.deleteTask('57e1699cd09bf01ccd5d1442');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks.length).toEqual(1);
                expect(component.tasks).toEqual(fakeTasks);
            });
        }));

        it('should not delete the task when not found', async(() => {
            spy = spyOn(taskService, 'deleteTask')
                .and.returnValue(Observable.of(true));
            fixture.detectChanges();          // trigger data binding

            component.deleteTask('57e1699cd09bf01cc442');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks.length).toEqual(2);
            });
        }));

        it('should throw exception when error ocurred while deleting a task', async(() => {
            let error = 'There was an error while deleting the task';
            spy = spyOn(taskService, 'deleteTask')
            .and.returnValue(Observable.throw(error));

            fixture.detectChanges();          // trigger data binding

            component.deleteTask('57e16a1055808a1d88211492');
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks.length).toEqual(2);
                expect(component.errorMessage).toEqual(error);
            });
        }));
    });
});
