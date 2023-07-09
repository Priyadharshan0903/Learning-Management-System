import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './pages/base-layout/base-layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotesManagerComponent } from './pages/notes-manager/notes-manager.component';
import {
  AuthGuard,
  LoginGuard,
  StaffGuard,
  StudentGuard,
} from './helpers/guard.guard';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { StudentsComponent } from './pages/students/students.component';
import { StaffComponent } from './pages/staff/staff.component';
import { SubjectsComponent } from './pages/subjects/subjects.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: 'notes',
        component: NotesManagerComponent,
        canActivate: [StudentGuard],
        data: { breadcrumb: 'Notes' },
      },
      {
        path: 'student/notes/:sem',
        component: NotesManagerComponent,
        canActivate: [],
        data: { breadcrumb: 'Notes' },
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        canActivate: [StudentGuard],
        data: { breadcrumb: 'Departments' },
      },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [StudentGuard, StaffGuard],
        data: { breadcrumb: 'Staff' },
      },
      {
        path: 'students',
        component: StudentsComponent,
        canActivate: [StudentGuard],
        data: { breadcrumb: 'Students' },
      },
      {
        path: 'subjects',
        component: SubjectsComponent,
        canActivate: [StudentGuard],
        data: { breadcrumb: 'Subjects' },
      },
    ],
  },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
