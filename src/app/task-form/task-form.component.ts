import { TaskService } from './../core/tasks.service';
import { Task } from './../tasks/task';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {

  tasks: Task[];
  newTask: Task;
  errorMessage: String;
  added: Boolean;

  constructor(private taskService: TaskService,
    private router: Router) {
    this.newTask = new Task();
    this.added = false;
  }

  ngOnInit() {
     this.taskService.getTasks().subscribe(tasks => this.tasks = tasks);
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe(
      taskCreated => {
        this.tasks.push(taskCreated);
        this.added = true;
      },
      error =>{ 
        this.errorMessage = error
        this.added = false;
      });
  }

  goToDashboard(){
     let link = ['/dashboard'];
     this.router.navigate(link);
  }

}
