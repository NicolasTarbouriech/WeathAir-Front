import {Component, ChangeDetectionStrategy,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { RegisterService } from "../core/register.service";
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })

  
export class RegisterComponent implements OnInit {

    emailValidationRegEx = '^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*([-]{1})?@[a-z0-9]+([\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$';
    registerForm: FormGroup;
    hasError = false;
    checked = false;
    err: boolean;
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private titleService: Title,
        private registerService: RegisterService
      ) {
      }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
          email: [
            '',
            Validators.compose([
              Validators.pattern(this.emailValidationRegEx),
              Validators.required])
          ],
          password: ['', Validators.required],
          verify_password: ['', Validators.required],
          township :  ['', Validators.required],
          pseudo :  ['', Validators.required]
        },
        );
    }

    keyPress(event) {
        // On enter pressed
        if (event.keyCode === 13) {
          this.router.navigate(['/home'])
        }
      }

      getRegister() {
        // console.log(this.loginForm.controls.email.value, this.loginForm.controls.password.value)
      this.registerService.register(
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value,
        this.registerForm.controls.pseudo.value,
        this.registerForm.controls.township.value
        )
      .subscribe(
        // en cas de succès, redirection vers la page /d'acceuil
       u => {
          this.router.navigate([`/home`]);
      },
        // en cas d'erreur, affichage d'un message d'erreur
        err => this.err = true
      );
    }
}