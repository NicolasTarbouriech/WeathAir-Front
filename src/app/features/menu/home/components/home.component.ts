import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HomeStorageService } from '../core/home-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchForm : FormGroup;
  errorInForm : boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private homeStorageService: HomeStorageService) {
    
  }

  ngOnInit(): void { 
    this.searchForm = this.formBuilder.group({
      township: ['', Validators.required]
    })
    this.errorInForm = false;
  }

  ngOnDestroy(): void {}

  btnClick () {

    if (!!this.searchForm.get('township').value) {
      this.errorInForm = false;
      this.homeStorageService.setTownship(this.searchForm.get('township').value);
      this.router.navigate(['/indicators', {township: this.searchForm.get('township').value}]);
    } else {
      this.errorInForm = true;
    }
    
  }
}
