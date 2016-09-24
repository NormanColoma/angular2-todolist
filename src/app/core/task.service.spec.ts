import './rxjs-extensions';

import { Task } from './../tasks/task';
import { TaskService } from './tasks.service';

import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';

import {
    HttpModule, Http, XHRBackend, Response, ResponseOptions
} from '@angular/http';

import {
    async, inject, TestBed
} from '@angular/core/testing';


describe('TaskService (mockBackend)', () => {

    let backend: MockBackend;
    let service: TaskService;
    let fakeTasks: Task[];
    let response: Response;
    let error: String;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                TaskService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        })
            .compileComponents();
    }));

    beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
        backend = be;
        service = new TaskService(http);
    }));

    it('can instantiate service when inject service',
    inject([TaskService], (s: TaskService) => {
      expect(s instanceof TaskService).toBe(true);
    }));
    describe('when getTasks', () => {

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
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
            let options = new ResponseOptions({ status: 200, body: { data: fakeTasks } });
            response = new Response(options);
        }));

        it('should have expected no. of tasks', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.getTasks().subscribe(tasks => {
                    expect(tasks.length).toBe(fakeTasks.length);
                });
        })));

        it('should have expected fake tasks', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.getTasks().subscribe(tasks => {
                    expect(tasks).toBe(fakeTasks);
                });
        })));
    });

    describe('when getTasks and exception occurred', () => {

        beforeEach(inject([Http, XHRBackend], (http: Http, be: MockBackend) => {
            error = 'There was an error while retrieving the data from the server';
            let options = new ResponseOptions({ status: 500, body: { data: error } });
            response = new Response(options);
        }));

        it('should have expected exception', async(inject([], () => {
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.getTasks().subscribe(err => {
                expect(err).toBe(error);
            });
        })));
    });

    describe('when deleteTask(id)', () => {

        it('should delete the task correctly', async(inject([], () => {
            let options = new ResponseOptions({ status: 200 , body: {data: true}});
            response = new Response(options);
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.deleteTask('123').subscribe(res => {
                expect(res).toBeTruthy();
            });

        })));

        it('should return false when error', () => {
            error = 'There was an error when deleting the task';
            let options = new ResponseOptions({ status: 500, body: { data: error } });
            response = new Response(options);
            backend.connections.subscribe((c: MockConnection) => c.mockRespond(response));

            service.deleteTask('123').subscribe(err => {
                expect(err).toBe(error);
            });

        });
    });

});
