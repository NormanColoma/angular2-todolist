import { TasksComponent } from './../tasks/tasks.component';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [DashboardComponent, TasksComponent]
})
export class DashboardModule { }
