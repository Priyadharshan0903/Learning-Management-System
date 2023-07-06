import { NzMessageService } from 'ng-zorro-antd/message';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from './../../models';

import { differenceInCalendarDays } from 'date-fns';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.scss'],
})
export class StaffFormComponent {
  departments: Department[];
  form: FormGroup;

  _staffId = -1;

  get staffId() {
    return this._staffId;
  }

  @Input()
  set staffId(id: number) {
    this._staffId = id;
    this.staffIdChange.emit(id);
    if (id > 0)
      this.http
        .get(`${environment.apiUrl}/staff/${id}`)
        .subscribe((data: any) => {
          this.form.patchValue(data);
        });
  }

  @Output()
  staffIdChange = new EventEmitter();

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
      email: ['', [Validators.required, Validators.email]],
      deptId: ['', [Validators.required]],
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
    if (this.form.valid) {
      if (this.staffId === -1)
        this.http
          .post(`${environment.apiUrl}/staff`, this.form.value)
          .subscribe((data: any) => {
            this.message.success('Staff added successfully');
            this.form.reset();
            this.onFormSubmit.emit();
          });
      else
        this.http
          .put(`${environment.apiUrl}/staff/${this.staffId}`, {
            id: this.staffId,
            ...this.form.value,
          })
          .subscribe((data: any) => {
            this.message.success('Staff updated successfully');
            this.staffId = -1;
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
