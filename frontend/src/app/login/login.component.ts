import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { MatDialog } from '@angular/material';
import { LoginPopupComponent } from './login-popup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]);
  
  constructor(private authService: AuthService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit() {
    this.hide = true;
  }

  public getEmailErrorMessage() : String {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  public getPasswordErrorMessage(): String {
    return this.password.hasError('required') ? 'You must enter a value' :
        this.password.hasError('minlength') ? 'Minimum length 6 characters' :
        this.password.hasError('maxlength') ? 'Maximum length 10 characters' :
        '';
  }

  public async login() {
    if (this.email.valid && this.password.valid) {
      const loginStatus = await this.authService.login(this.email.value, this.password.value);

      if (loginStatus.loggedIn) {
        this.router.navigate(['/dashboard']);
      } else {
        this.dialog.open(LoginPopupComponent, {
          width: '300px',
          data: {registered: false, errorMessage: loginStatus.message}
        });
      }
    }
  }

  public async register() {
    if (this.email.valid && this.password.valid) {
      const registerStatus = await this.authService.register(this.email.value, this.password.value);

      if (registerStatus.registered) {
        this.dialog.open(LoginPopupComponent, {
          width: '300px',
          data: {registered: true}
        });
      } else {
        this.dialog.open(LoginPopupComponent, {
          width: '300px',
          data: {registered: false, errorMessage: registerStatus.message}
        });
      }
    }
  }
}
