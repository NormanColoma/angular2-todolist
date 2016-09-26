import { TaskService } from './../core/tasks.service';
import { Component, OnInit } from '@angular/core';
import { Task } from './task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Task[];
  removed: Boolean;
  errorMessage: String;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  deleteTask(id: String) {
    this.removed = false;
    this.taskService.deleteTask(id).subscribe(
      removed => this.removeFromArray(id, removed),
      error => this.errorMessage = error
    );
  }

  private removeFromArray(id: String, removed: Boolean) {
    let index = this.tasks.findIndex(task => task._id === id);
    if (index >= 0) {
      this.tasks.splice(index, 1);
      this.removed = removed;
    }
  }

}
