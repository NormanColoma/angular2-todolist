import { TaskService } from './../core/tasks.service';
import { Task } from './../tasks/task';
import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  tasks: Task[];
  newTask: Task;

  constructor(private taskService: TaskService) {
    this.newTask = new Task();
  }

  ngOnInit() {
     this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask(task: Task) {
     this.taskService.addTask(task).subscribe(taskCreated => this.tasks.push(taskCreated));
  }

}
