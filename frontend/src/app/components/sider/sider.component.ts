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

  constructor() {}

  dropdown: { id: any; isOpen: boolean } = {
    id: null,
    isOpen: false,
  };

  ngOnInit(): void {}

  toggle(id: any) {
    if (id === this.dropdown.id) this.dropdown.isOpen = !this.dropdown.isOpen;
    else this.dropdown.isOpen = true;
    this.dropdown.id = id;
  }
}
