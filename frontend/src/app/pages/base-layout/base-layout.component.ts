import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.scss'],
})
export class BaseLayoutComponent implements OnInit {
  menu: Menu[] = [];
  isCollapsed = false;
  user = JSON.parse(String(localStorage.getItem('user')));
  constructor() {}

  ngOnInit() {
    //sider
    if (this.user.role === 'STUDENT')
      this.menu = [
        {
          title: 'Organisation',
          icon: 'dashboard',
          path: '',
          children: [
            {
              title: 'pec',
              path: 'pec',
            },
            { title: 'msec', path: 'msec' },
            { title: 'srm', path: 'srem' },
          ],
        },
      ];
    else
      this.menu = [
        {
          title: 'Organisation',
          icon: 'dashboard',
          path: '',
          children: [
            {
              title: 'pec',
              path: 'pec',
            },
            { title: 'msec', path: 'msec' },
            { title: 'srm', path: 'srem' },
          ],
        },
        {
          title: 'Student Database',
          icon: 'form',
          path: 'StudentDatabase',
        },
      ];
  }
}
