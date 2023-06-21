import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiderComponent } from './sider/sider.component';
import { NgZorroModule } from '../NgZorro.module';

@NgModule({
  declarations: [SiderComponent],
  imports: [CommonModule, NgZorroModule],
  exports: [SiderComponent],
})
export class ComponentsModule {}
