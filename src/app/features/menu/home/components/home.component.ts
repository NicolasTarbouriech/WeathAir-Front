import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchForm : FormGroup;

  constructor(private router: Router) {
    
  }

  ngOnInit(): void { 
    
  }

  ngOnDestroy(): void {}

  btnClick () {
    this.router.navigateByUrl('/indicators');
  }
}
