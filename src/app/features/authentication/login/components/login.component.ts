import {  LoginRequest } from './../core/auth.model';
import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { environment } from '../../../../../environments/environment';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {
  emailValidationRegEx = '^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*([-]{1})?@[a-z0-9]+([\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$';

  isLoading: Boolean = false;
  loginRequest: LoginRequest = {
    password: '',
    username: ''
  };
  // utilisé pour afficher l'erreur de login
  hasError = false;
  loginForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(`${environment.appName} | Login`)

    this.loginForm = this.formBuilder.group({
      login: [
        '',
        Validators.compose([
          Validators.pattern(this.emailValidationRegEx),
          Validators.required])
      ],
      password: ['', Validators.required]
    }
    );
  }

  keyPress(event) {
    // On enter pressed
    if (event.keyCode === 13) {
      this.onLoginClick();
    }
  }

  onLoginClick() {
    if (this.loginForm.valid) {
      this.router.navigate(['/home', {}]);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
