import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from '../components/components.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgZorroModule } from '../NgZorro.module';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesManagerComponent } from './notes-manager/notes-manager.component';
import { DepartmentsComponent } from './departments/departments.component';

@NgModule({
  declarations: [BaseLayoutComponent, NotesManagerComponent, DepartmentsComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    NgZorroModule,
    RouterModule,
    ComponentsModule,
  ],
  exports: [],
})
export class PagesModule {}
