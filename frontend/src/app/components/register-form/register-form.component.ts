import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  validateForm!: FormGroup;
  password: any;
  passwordVisible: any;
  submitForm(): void {
    if (this.validateForm.valid) {
      this.http
        .post(`${environment.apiUrl}/users/register`, this.validateForm.value)
        .subscribe((res) => {
          console.log(res);
        });
      this.router.navigate(['/login']);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  optionList = [
    { label: 'Computer Science Engineering', value: 'CSE' },
    { label: 'Electronics and Communication Engineering', value: 'ECE' },
  ];
  selectedValue = { label: 'Jack', value: 'jack' };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  compareFn = (o1: any, o2: any): boolean =>
    o1 && o2 ? o1.value === o2.value : o1 === o2;

  log(value: { label: string; value: string; age: number }): void {
    console.log(value);
  }

  // College Lists //

  collegeList = [
    { label: 'Panimalar Engineering College', value: 'PEC' },
    { label: 'SRM Easwari College of Engineering', value: 'SRM' },
    {
      label: 'Meenakshi Sundaram College of Engineering',
      value: 'MSCOE',
    },
  ];
  selectedClg = { label: 'Jack', value: 'jack' };

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      department: [null, [Validators.required]],
    });
  }
}
