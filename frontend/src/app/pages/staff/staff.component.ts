import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Department, Staff } from 'src/app/models';

import { environment } from 'src/environments/environment';
import { FadeInOut } from 'src/app/animations';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
  animations: [FadeInOut],
})
export class StaffComponent implements OnInit {
  staff: Staff[];

  isLoading = false;

  total: number;
  pageSize = 10;
  pageIndex = 1;
  filter = [];

  staffId = -1;

  departments: Department[];

  _search = '';
  debounce: any;

  public get search(): string {
    return this._search;
  }

  public set search(v: string) {
    clearTimeout(this.debounce);
    this.debounce = setTimeout(() => {
      this._search = v;
      this.getStaff();
    }, 300);
  }

  constructor(private http: HttpClient, private message: NzMessageService) {}

  ngOnInit(): void {
    this.http.get<Department[]>(`${environment.apiUrl}/departments`).subscribe({
      next: (data: Department[]) => {
        this.departments = data;
      },
    });
  }

  getStaff(p?: any) {
    let params = new HttpParams()
      .append('page', `${this.pageIndex}`)
      .append('size', `${this.pageSize}`)
      .append('search', `${this.search}`);
    if (p) this.filter = p.filter;

    if (this.filter) {
      this.filter.forEach((filter: { value: any[]; key: string }) => {
        filter.value.forEach((value) => {
          params = params.append(filter.key, value);
        });
      });
    }
    this.isLoading = !this.isLoading;
    this.http.get<Staff[]>(`${environment.apiUrl}/users`).subscribe({
      next: (res: Staff[]) => {
        console.log(res);
        this.isLoading = !this.isLoading;
        this.staff = res;
      },
    });
  }

  deleteStaff(id: number) {
    this.http.delete(`${environment.apiUrl}/staff/${id}`).subscribe({
      next: (data: any) => {
        this.message.success('Staff deleted successfully');
        this.getStaff();
      },
    });
  }
}
