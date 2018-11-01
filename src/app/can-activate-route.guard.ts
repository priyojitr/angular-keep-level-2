import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';


@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  private _bearerToken: string;

  constructor(public _authService: AuthenticationService,
    public _routerService: RouterService) {
      this._bearerToken = this._authService.getBearerToken();
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const booleanPromise = this._authService.isUserAuthenticated(this._bearerToken);
      return booleanPromise.then((authenticated) => {
        if (!authenticated ) {
          this._routerService.routeToLogin();
        }
        return authenticated;
      });
  }
}
