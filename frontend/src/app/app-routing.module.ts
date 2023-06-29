import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './pages/base-layout/base-layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotesManagerComponent } from './components/notes-manager/notes-manager.component';
import { DepartmentComponent } from './components/department/department.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { AuthGuard, StudentGuard } from './helpers/guard.guard';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'notes',
        component: NotesManagerComponent,
        canActivate: [AuthGuard, StudentGuard],
      },
      {
        path: 'CSE',
        component: DepartmentComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  {
    path: 'register',
    component: RegisterFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
