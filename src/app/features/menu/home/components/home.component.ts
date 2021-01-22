import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchForm : FormGroup;

  constructor(private formBuilder: FormBuilder,private router: Router) {
    
  }

  ngOnInit(): void { 
    this.searchForm = this.formBuilder.group({
      township: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {}

  btnClick () {
    this.router.navigateByUrl('/indicators');
    console.log(this.searchForm.get('township').value);
  }
}
