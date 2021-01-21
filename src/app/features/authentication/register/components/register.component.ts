import {Component, ChangeDetectionStrategy,  OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
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
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private titleService: Title,
      ) {
      }
    ngOnInit() {
        this.titleService.setTitle(`${environment.appName} | Login`)

        this.registerForm = this.formBuilder.group({
          login: [
            '',
            Validators.compose([
              Validators.pattern(this.emailValidationRegEx),
              Validators.required])
          ],
          password: ['', Validators.required],
          verify_password: ['', Validators.required],
          commune :  ['', Validators.required],
          pseudo :  ['', Validators.required]
        },
       
        );
    }

    keyPress(event) {
        // On enter pressed
        if (event.keyCode === 13) {
          this.onRegisterClick();
        }
      }

    onRegisterClick() {
        if (this.registerForm.valid) {
          this.router.navigate(['/home', {}]);
        } else {
          this.registerForm.markAllAsTouched();
        }
      }

}