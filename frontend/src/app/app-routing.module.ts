import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './pages/base-layout/base-layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotesManagerComponent } from './pages/notes-manager/notes-manager.component';
import { AuthGuard } from './helpers/guard.guard';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { StudentsComponent } from './pages/students/students.component';
import { StaffComponent } from './pages/staff/staff.component';

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
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Notes' },
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Departments' },
      },
      {
        path: 'staff',
        component: StaffComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Staff' },
      },
      {
        path: 'students',
        component: StudentsComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Students' },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
