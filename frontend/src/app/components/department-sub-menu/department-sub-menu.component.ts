import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-department-sub-menu',
  templateUrl: './department-sub-menu.component.html',
  styleUrls: ['./department-sub-menu.component.scss'],
})
export class DepartmentSubMenuComponent {
  @Input()
  semesters!: any[];
}
