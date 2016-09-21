import { Task } from './../tasks/task';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs';

@Injectable()
export class TaskService {

    private tasksUrl = 'http://localhost:3000/tasks';

    constructor(private http: Http) { }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    getTasks(): Observable <Task[]> {
        return this.http.get(this.tasksUrl).map(this.extractData);
    }
}
