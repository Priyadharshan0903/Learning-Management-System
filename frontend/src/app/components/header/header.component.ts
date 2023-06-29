import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isCollapsed = false;

  isVisible = false;
  isConfirmLoading = false;

  userName!: String;
  role!: String;
  email!: String;
  user!: any;
  router: any;
  constructor() {}

  ngOnInit(): void {
    this.user = JSON.parse(String(localStorage.getItem('user')));
    this.userName = this.user.name;
    this.role = this.user.role;
    this.email = this.user.email;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigateByUrl('/login');
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
