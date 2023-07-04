import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderComponent } from './sider/sider.component';
import { NgZorroModule } from '../NgZorro.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { RegisterFormComponent } from './register-form/register-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { StudentFormComponent } from './student-form/student-form.component';
@NgModule({
  declarations: [
    SiderComponent,
    HeaderComponent,
    RegisterFormComponent,
    StudentFormComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [SiderComponent, HeaderComponent, StudentFormComponent],
})
export class ComponentsModule {}
