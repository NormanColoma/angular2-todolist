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

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    getTasks(): Observable <Task[]> {
        return this.http.get(this.tasksUrl)
        .map(this.extractData)
        .catch(this.handleError);
    }
}
