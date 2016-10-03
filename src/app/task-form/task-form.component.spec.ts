import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TaskService } from './../core/tasks.service';
import { Observable } from 'rxjs';
import { Task } from './../tasks/task';
/* tslint:disable:no-unused-variable */

import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';

describe('Task Form Component', () => {
    let component: TaskFormComponent;
    let fixture: ComponentFixture<TaskFormComponent>;
    let taskService: TaskService;
    let spy;
    let fakeTasks: Task[];
    let newTask: Task;

     describe('When adding new task', () => {
        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [HttpModule, FormsModule],
                declarations: [TaskFormComponent],
                providers: [TaskService]
            })
                .compileComponents();
            fixture = TestBed.createComponent(TaskFormComponent);
            component = fixture.componentInstance;

            taskService = fixture.debugElement.injector.get(TaskService);

            // Current Tasks in the component
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
            newTask = {
                    '_id': '57e1699cx09bf01ccd5d1442',
                    'name': 'New Task',
                    'description': 'This is the new task',
                    'author': 'Norman',
                    'created_at': new Date('2016-09-20T16:53:48.668Z'),
                    'pending': true
                };

            spy = spyOn(taskService, 'getTasks')
            .and.returnValue(Observable.of(fakeTasks));
        }));

        it('should add the new task to tasks component array', async(() => {
            // Configure the spy on the service. When calling addTask return newTask.
            spy = spyOn(taskService, 'addTask')
                .and.returnValue(Observable.of(newTask));


            fixture.detectChanges();          // trigger data binding

            component.addTask(newTask);
            fixture.whenStable().then(() => {
              fixture.detectChanges();
              expect(component.tasks.length).toBe(3);
              expect(component.tasks).toEqual(fakeTasks);
            });
        }));

         it('should throw exception when error ocurred while adding new task', async(() => {
            let error = 'There was an error while adding the new task';
            spy = spyOn(taskService, 'addTask')
            .and.returnValue(Observable.throw(error));

            fixture.detectChanges();          // trigger data binding

            component.addTask(newTask);
            fixture.whenStable().then(() => {
                fixture.detectChanges();
                expect(component.tasks.length).toEqual(2);
                expect(component.errorMessage).toEqual(error);
            });
        }));

    });

});
