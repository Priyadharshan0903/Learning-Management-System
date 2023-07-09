import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from './../../models';

import { differenceInCalendarDays } from 'date-fns';

import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss'],
})
export class StudentFormComponent implements OnInit {
  departments: Department[];
  form: FormGroup;

  _studentId = -1;

  get studentId() {
    return this._studentId;
  }

  @Input()
  set studentId(id: number) {
    this._studentId = id;
    this.studentIdChange.emit(id);
    if (id > 0)
      this.http
        .get(`${environment.apiUrl}/students/${id}`)
        .subscribe((data: any) => {
          this.form.patchValue(data);
        });
  }

  @Output()
  studentIdChange = new EventEmitter();

  @Output()
  onFormSubmit = new EventEmitter();

  disabledDate = (current: Date): boolean =>
    // Can not select days before today and today
    differenceInCalendarDays(current, new Date()) > 0;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      regNo: ['', [Validators.required]],
      rollNo: ['', [Validators.required]],
      deptId: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.http
      .get(`${environment.apiUrl}/departments`)
      .subscribe((data: any) => {
        this.departments = data;
      });
  }

  submit() {
    console.log(this.form.value);
    if (this.form.valid) {
      let data = this.form.value;
      data.dob = formatDate(data.dob, 'yyyy-MM-dd', 'en');
      if (this.studentId === -1)
        this.http
          .post(`${environment.apiUrl}/students`, data)
          .subscribe((data: any) => {
            this.message.success('Student added successfully');
            this.form.reset();
            this.onFormSubmit.emit();
          });
      else
        this.http
          .put(`${environment.apiUrl}/students/${this.studentId}`, {
            id: this.studentId,
            ...data,
          })
          .subscribe((data: any) => {
            this.message.success('Student updated successfully');
            this.studentId = -1;
            this.form.reset();
            this.onFormSubmit.emit();
          });
    } else {
      Object.values(this.form.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
