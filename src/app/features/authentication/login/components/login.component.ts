import { FormBuilder, Form, Validators, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User } from '../core/login.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { LoginService } from '../core/login.service'
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConnectedUser } from 'src/app/shared/models/ConnectedUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  user: User = new User({});

  connectedUser : ConnectedUser;

  emailValidationRegEx = '^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*([-]{1})?@[a-z0-9]+([\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$';
  checked = false;
  isLoading: Boolean = false;

  // utilisé pour afficher l'erreur de login
  hasError = false;
  loginForm: FormGroup;
  err: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [
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
      this.getLogin();
    }
  }

  getLogin() {
    // console.log(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
    this.loginService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      .subscribe(
        // en cas de succès, redirection vers la page /d'acceuil
        /* u => {
          this.router.navigate([`/home`]); */
       /*  }, */
       () => this.loginService.getMe().subscribe(
         user => {
          this.connectedUser = user;
          this.loginService.sendToUserSub(user);
          this.router.navigate([`/home`]);
         },
         err => console.log(err)
       ),
        // en cas d'erreur, affichage d'un message d'erreur
        err => this.err = true
      );
  }



}



