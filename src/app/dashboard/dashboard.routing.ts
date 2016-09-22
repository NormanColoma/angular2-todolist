import { DashboardComponent } from './dashboard.component';
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const dashboardRoutes: Routes = [
  { path: 'dashboard',  component: DashboardComponent },
];

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
