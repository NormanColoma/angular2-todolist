import { Task } from './../app/tasks/task';
import { Observable } from 'rxjs';
export class StubTaskService {
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

    getTasks(): Observable<Task[]> {
        return Observable.of(this.fakeTasks);
    }
}
