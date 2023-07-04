import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Department } from 'src/app/models';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss'],
})
export class DepartmentsComponent implements OnInit {
  departments: Department[];
  isLoading = false;

  id = -1;
  name = new FormControl('', [Validators.required]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDepartments();
  }

  getDepartments() {
    this.isLoading = true;
    this.http.get(`${environment.apiUrl}/departments`).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.departments = data as Department[];
      },
    });
  }

  reset() {
    this.name.setValue('');
    this.id = -1;
    this.getDepartments();
  }

  submit() {
    if (this.name.value) {
      const department: Department = {
        id: this.id,
        name: this.name.value,
      };
      if (this.id === -1)
        this.http
          .post(`${environment.apiUrl}/departments`, department)
          .subscribe({
            next: (data) => this.reset(),
            error: console.error,
          });
      else
        this.http
          .put(`${environment.apiUrl}/departments`, department)
          .subscribe({
            next: (data) => this.reset(),
            error: console.error,
          });
    }
  }

  delete(id: number) {
    this.http.delete(`${environment.apiUrl}/departments/${id}`).subscribe({
      next: (data) => {
        this.departments = [
          ...this.departments.filter((d) => d.id !== this.id),
        ];
        this.id = -1;
      },
      error: console.error,
    });
  }
}
