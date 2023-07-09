import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = localStorage.getItem('token');
    if (token) return true;

    this.router.navigate(['/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}

@Injectable({ providedIn: 'root' })
export class LoginGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let token = localStorage.getItem('token');

    if (token) {
      this.router.navigate(['/notes']);
      return false;
    }

    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class StaffGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = JSON.parse(String(localStorage.getItem('user')));

    if (user.role === 'STAFF') {
      this.router.navigate(['/notes']);
      return false;
    }
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class StudentGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let user = JSON.parse(String(localStorage.getItem('user')));

    if (user.role === 'STUDENT') {
      this.router.navigate(['/student/notes/1']);
      return false;
    }
    return true;
  }
}
