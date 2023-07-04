import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sider',
  templateUrl: './sider.component.html',
  styleUrls: ['./sider.component.scss'],
})
export class SiderComponent implements OnInit {
  isCollapsed = true;
  user = JSON.parse(String(localStorage.getItem('user')));

  notesManager = false;
  departments = ['CSE', 'EEE', 'MECH', 'ECE', 'IT', 'ADMIN'];

  constructor() {}

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

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }

  semesters = [
    { id: '1', title: 'Semester 1' },
    { id: '2', title: 'Semester 2' },
    { id: '3', title: 'Semester 3' },
    { id: '4', title: 'Semester 4' },
    { id: '5', title: 'Semester 5' },
    { id: '6', title: 'Semester 6' },
    { id: '7', title: 'Semester 7' },
    { id: '8', title: 'Semester 8' },
  ];
}
