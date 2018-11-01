import { Injectable } from '@angular/core';
// router service
import { Router } from '@angular/router';


@Injectable()
export class RouterService {

  constructor(private router: Router) { }

  routeToDashboard() {
    this.router.navigate(['dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['login']);
  }
}
