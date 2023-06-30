import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

// import { Input } from 'antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  password: any;
  passwordVisible: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  submitForm(): void {
    if (this.validateForm.valid) {
      this.http
        .post(`${environment.apiUrl}/users/login`, this.validateForm.value)
        .subscribe((user: any) => {
          localStorage.setItem('token', user.token);
          delete user.token;
          localStorage.setItem('user', JSON.stringify(user));
          this.route.queryParams.subscribe((qp: any) => {
            if (qp.returnUrl) this.router.navigateByUrl(qp.returnUrl);
            else this.router.navigateByUrl('/');
          });
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      remember: [true],
    });
  }
}
