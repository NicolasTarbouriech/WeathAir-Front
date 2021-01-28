import {Component, ChangeDetectionStrategy,  OnInit, ChangeDetectorRef } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Township } from "src/app/shared/models/Township";
import { RegisterService } from "../core/register.service";
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
  })

  
export class RegisterComponent implements OnInit {

    emailValidationRegEx = '^[a-z0-9]+([_|\.|-]{1}[a-z0-9]+)*([-]{1})?@[a-z0-9]+([\.|-]{1}[a-z0-9]+)*[\.]{1}[a-z]{2,6}$';
    // registerForm: FormGroup;
    registerForm : FormGroup = new FormGroup({});
    hasError = false;
    checked = false;
    err: boolean;
    filteredOptions: Observable<any[]>;
    options : Township[] = [];
    confirmationHasError: boolean = false;
    contentLoading : boolean = true;

    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private registerService: RegisterService,
        private changeDetectorRef: ChangeDetectorRef
      ) {
      }
    ngOnInit() {
      
        this.loadCities();
        this.registerForm = this.formBuilder.group({
          pseudo : ['', Validators.required],
          email: [
            '',
            Validators.compose([
              Validators.pattern(this.emailValidationRegEx),
              Validators.required])
          ],
          password: ['', Validators.required],
          verify_password: ['', Validators.required],
          township : ['', Validators.required]
        });

        this.filteredOptions = this.registerForm.get('township').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      )
    }

   private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)
    .slice(0, 5);
  }


    keyPress(event) {
        // On enter pressed
        if (event.keyCode === 13) {
          this.router.navigate(['/home'])
        }
      }

      getRegister() {
        if (!this.registerForm.valid){
          this.registerForm.markAllAsTouched();
          return;
        }
        
        const selectedTown = this.registerForm.controls.township.value;
        if(!selectedTown) {
          return;
        }
        const pass = this.registerForm.controls.password.value;
        const verifyPass = this.registerForm.controls.verify_password.value;
        this.confirmationHasError = false;
        this.registerForm.controls.verify_password.setErrors( null);

        if(pass!==verifyPass){
          this.confirmationHasError = true;
          this.registerForm.markAllAsTouched();
          this.registerForm.controls.verify_password.setErrors({ 'incorrect' : true });
          this.changeDetectorRef.detectChanges();
          return;
        }

      this.registerService.register(
        this.registerForm.controls.pseudo.value,
        this.registerForm.controls.email.value,
        this.registerForm.controls.password.value,
        selectedTown,
        )
      .subscribe(
        // en cas de succès, redirection vers la page /d'acceuil
       u => {
          this.router.navigate([`/login`]);
          console.log(this.registerForm.value)
      },
        // en cas d'erreur, affichage d'un message d'erreur
        err => this.err = true
        
      );
    }

    displayFn(township: any): string {
      return township && township.name ? township.name : '';
    }

    loadCities() {
      return this.registerService.getTownships().subscribe( 
        result => {
          this.options = result;
          console.log(result);
          this.contentLoading= false;
          this.changeDetectorRef.detectChanges();
        }, err => {
          this.contentLoading = false;
          this.changeDetectorRef.detectChanges();
          console.log(err);
        }
      )
      }

    
}