import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  FormOutline,
  DashboardOutline,
  MailOutline,
  UserOutline,
  PieChartFill,
  AppstoreFill,
  AppstoreAddOutline,
  SettingFill,
  DashboardFill,
} from '@ant-design/icons-angular/icons';

const icons = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  DashboardOutline,
  FormOutline,
  MailOutline,
  UserOutline,
  PieChartFill,
  AppstoreFill,
  AppstoreAddOutline,
  SettingFill,
  DashboardFill,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
