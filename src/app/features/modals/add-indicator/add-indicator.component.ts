import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../authentication/login/core/login.model';
import { LoginService } from '../../authentication/login/core/login.service';

@Component({
  selector: 'app-add-indicator',
  templateUrl: './add-indicator.component.html',
  styleUrls: ['./add-indicator.component.scss']
})
export class AddIndicatorComponent implements OnInit {

  favoriteForm: FormGroup;
  hasError = false;
  checked = false;

  meteo = false;
  air = false;

  connectedUser :User;

  constructor(private router: Router, private formBuilder: FormBuilder, private loginService :LoginService) { }

  ngOnInit(): void {

    this.loginService.getMe().subscribe(user => console.log(user))

    this.loginService.connectedUserObs.subscribe(user => {this.connectedUser = user});

    this.favoriteForm = this.formBuilder.group({
      township: ['', Validators.required],
      labelIndicator: ['', Validators.required],
      duration: ['', Validators.required],
      idUser: [this.connectedUser.id, Validators.required]
    });
  }

  whatFrom(value) {
    if (value.value === "meteo") {
      this.air = false;
      this.meteo = true;
    } else if (value.value === "air") {
      this.meteo = false;
      this.air = true;
    }
  }

  addToMyIndicators() {
    console.log(this.connectedUser.id)
    if (this.favoriteForm.valid) {
      console.log(this.favoriteForm.value)
      //this.router.navigate(['/home', {}]);
    } else {
      this.favoriteForm.markAllAsTouched();
    }
  }


}
