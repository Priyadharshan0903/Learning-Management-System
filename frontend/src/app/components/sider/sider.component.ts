import { Component, Input, OnInit } from '@angular/core';
import { Menu } from '../../models/menu';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss'],
})
export class SiderComponent implements OnInit {
  @Input()
  menu: Menu[] = [];

  isCollapsed = true;
  mode = false;
  dark = false;
  user = JSON.parse(String(localStorage.getItem('user')));
  department = this.user.department;
  constructor() {}

  // dropdown: { id: any; isOpen: boolean } = {
  //   id: null,
  //   isOpen: false,
  // };

  notesManager = false;

  ngOnInit(): void {
    if (this.user.role === 'STUDENT') {
      this.notesManager = false;
      this.isCollapsed = false;
    }
    if (this.user.role === 'ADMIN') {
      this.notesManager = true;
    }
    if (this.user.role === 'STAFF') {
      this.notesManager = true;
    }
  }

  // toggle(id: any) {
  //   if (id === this.dropdown.id) this.dropdown.isOpen = !this.dropdown.isOpen;
  //   else this.dropdown.isOpen = true;
  //   this.dropdown.id = id;
  // }
  menus = [
    {
      level: 1,
      title: 'Mail Group',
      icon: 'mail',
      theme: 'twotone',
      open: true,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'Group 1',
          icon: 'bars',
          open: false,
          selected: false,
          disabled: false,
          children: [
            {
              level: 3,
              title: 'Option 1',
              selected: false,
              disabled: false,
            },
            {
              level: 3,
              title: 'Option 2',
              selected: false,
              disabled: true,
            },
          ],
        },
        {
          level: 2,
          title: 'Group 2',
          icon: 'bars',
          selected: true,
          disabled: false,
        },
        {
          level: 2,
          title: 'Group 3',
          icon: 'bars',
          selected: false,
          disabled: false,
        },
      ],
    },
    {
      level: 1,
      title: 'Team Group',
      icon: 'team',
      open: false,
      selected: false,
      disabled: false,
      children: [
        {
          level: 2,
          title: 'User 1',
          icon: 'user',
          selected: false,
          disabled: false,
        },
        {
          level: 2,
          title: 'User 2',
          icon: 'user',
          selected: false,
          disabled: false,
        },
      ],
    },
  ];
}
