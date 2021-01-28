import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cgu',
  templateUrl: './cgu.component.html',
  styleUrls: ['./cgu.component.scss']
})
export class CguComponent implements OnInit {

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['/register'])
  }
  
}
