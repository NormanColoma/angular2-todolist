import './rxjs-extensions';
import { TaskService } from './tasks.service';
import { HttpModule } from '@angular/http';
import {
  ModuleWithProviders, NgModule,
  Optional, SkipSelf }       from '@angular/core';
import { CommonModule }      from '@angular/common';

@NgModule({
    imports: [CommonModule, HttpModule],
    providers: [TaskService],
})
export class CoreModule { }
