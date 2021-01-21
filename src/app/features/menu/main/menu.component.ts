import { Router } from '@angular/router';
import { UserInfo } from '../../authentication/login/core/login.model';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit, OnDestroy {

  title = '';
  menus = [];
  navigation = [];
  mode = new FormControl('over');

  constructor( private router: Router ) {
    this.initMenuItems();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  private initMenuItems() {
    // les noms des icons disponible sur : https://material.io/resources/icons/
    this.title = 'WeathAir';
    this.menus = [
      { link: '/home/forum', label: 'Forum'}
    ];
  }

  onLogoutClick() {
    this.router.navigate(['/login', {}]);
  }
  
}
