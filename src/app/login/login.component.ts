import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
// import authentication service
import { AuthenticationService } from '../services/authentication.service';
// import router service
import { RouterService } from '../services/router.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm = new FormGroup(
      {
        username: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required, Validators.minLength(4)])
      }
    );
    public bearerToken: any;
    public erroMessage: string;

    constructor(private _authService: AuthenticationService,
      private _routerService: RouterService) {
      }
    // get the username & password of the login comp
    get username() {
      return this.loginForm.get('username');
    }
    get userpassword() {
      return this.loginForm.get('password');
    }
    // set error messages for login form
    getUsernameBlankErrorMsg() {
      return this.username.hasError('required') ? 'username field should not be blank' : '';
    }
    getPasswordBlankErrorMsg() {
      return this.userpassword.hasError('required') ? 'password field should not be blank' : '';
    }
    getPasswordLengthErrorMsg() {
      return this.userpassword.hasError('minlength') ? 'password field should have min length 4' : '';
    }

    loginSubmit() {
      this._authService.authenticateUser(this.loginForm.value).subscribe(
        res => {
          this.bearerToken = res['token'];
          this._authService.setBearerToken(this.bearerToken);
          this._routerService.routeToDashboard();
        },
        err => {
          this.erroMessage = err.error.message;
        }
      );
    }
}
