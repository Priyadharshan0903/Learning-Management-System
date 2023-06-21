import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderComponent } from './sider/sider.component';
import { NgZorroModule } from '../NgZorro.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SiderComponent, HeaderComponent],
  imports: [CommonModule, NgZorroModule, RouterModule],
  exports: [SiderComponent, HeaderComponent],
})
export class ComponentsModule {}
