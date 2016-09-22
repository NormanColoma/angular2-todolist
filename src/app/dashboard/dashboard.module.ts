import { TasksComponent } from './../tasks/tasks.component';
import { SharedModule } from './../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { dashboardRouting } from './dashboard.routing';


@NgModule({
  imports: [
    SharedModule,
    dashboardRouting
  ],
  declarations: [DashboardComponent, TasksComponent]
})
export class DashboardModule { }
