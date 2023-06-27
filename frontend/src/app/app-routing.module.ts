import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './pages/base-layout/base-layout.component';
import { LoginComponent } from './authentication/login/login.component';
import { NotesManagerComponent } from './components/notes-manager/notes-manager.component';
import { DepartmentComponent } from './components/department/department.component';

const routes: Routes = [
  {
    path: '',
    component: BaseLayoutComponent,
    children: [
      {
        path: 'notes',
        component: NotesManagerComponent,
      },
      {
        path: 'CSE',
        component: DepartmentComponent,
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
