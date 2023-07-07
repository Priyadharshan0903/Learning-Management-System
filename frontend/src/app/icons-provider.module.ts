import { NgModule } from '@angular/core';
import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';

import {
  DashboardOutline,
  UserOutline,
  BuildOutline,
  DatabaseOutline,
  DownloadOutline,
  EyeInvisibleOutline,
  FolderOpenOutline,
  LockOutline,
  MailOutline,
  PieChartOutline,
  PlusOutline,
  TeamOutline,
  HomeOutline,
} from '@ant-design/icons-angular/icons';

const icons = [
  DashboardOutline,
  UserOutline,
  BuildOutline,
  DatabaseOutline,
  DownloadOutline,
  EyeInvisibleOutline,
  FolderOpenOutline,
  LockOutline,
  MailOutline,
  PieChartOutline,
  PlusOutline,
  TeamOutline,
  HomeOutline,
];

@NgModule({
  imports: [NzIconModule],
  exports: [NzIconModule],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
})
export class IconsProviderModule {}
