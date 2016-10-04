import { TaskFormComponent } from './../task-form/task-form.component';
import { DashboardComponent } from './dashboard.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const dashboardRoutes: Routes = [
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'tasks/new', component: TaskFormComponent }
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
