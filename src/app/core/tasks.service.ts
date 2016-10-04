import { Task } from './../tasks/task';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Observable }     from 'rxjs';

@Injectable()
export class TaskService {

    private tasksUrl = 'https://todolist-node-backend.herokuapp.com/tasks';

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

    deleteTask(id: String): Observable <Boolean> {
        const url = this.tasksUrl + '/' + id;
        return this.http.delete(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    addTask(t: Task): Observable<Task> {
        let body = JSON.stringify(t);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.tasksUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
    }
}
