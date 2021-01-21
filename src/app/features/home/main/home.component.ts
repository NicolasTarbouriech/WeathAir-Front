import { Router } from '@angular/router';
import { UserInfo } from './../../authentication/login/core/auth.model';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {


  menus = [];
  navigation = [];
  mode = new FormControl('over');


  constructor( private router: Router ) {
    this.initMenuItems();


  }

  private initMenuItems() {
    // les noms des icons disponible sur : https://material.io/resources/icons/
    this.menus = [
      { link: '/home/feed', label: 'Fil d\'actualité', icon: 'home', hasAcces$: of(true)},
      { link: '/home/messenger', label: 'Messagerie', icon: 'verified_user', hasAcces$: of(true) },
    ];
  }

  onLogoutClick() {
    this.router.navigate(['/login', {}]);
  }
  ngOnInit(): void { }

  ngOnDestroy(): void {
  }
}
