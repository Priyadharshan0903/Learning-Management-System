import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderComponent } from './sider/sider.component';
import { NgZorroModule } from '../NgZorro.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { NotesManagerComponent } from './notes-manager/notes-manager.component';
import { DepartmentComponent } from './department/department.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { DepartmentSubMenuComponent } from './department-sub-menu/department-sub-menu.component';
@NgModule({
  declarations: [
    SiderComponent,
    HeaderComponent,
    NotesManagerComponent,
    DepartmentComponent,
    RegisterFormComponent,
    DepartmentSubMenuComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SiderComponent, HeaderComponent],
})
export class ComponentsModule {}
