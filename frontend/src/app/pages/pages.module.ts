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
import { StudentsComponent } from './students/students.component';
import { StaffComponent } from './staff/staff.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    BaseLayoutComponent,
    NotesManagerComponent,
    DepartmentsComponent,
    StudentsComponent,
    StaffComponent,
  ],
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
    PdfViewerModule,
  ],

  exports: [],
})
export class PagesModule {}
