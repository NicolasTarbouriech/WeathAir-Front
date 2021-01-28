import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormControl } from '@angular/forms';
import { LoginService } from '../../authentication/login/core/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  title = '';
  menus = [];
  navigation = [];
  mode = new FormControl('over');

  constructor( private router: Router, private loginService : LoginService ) {
    this.initMenuItems();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  private initMenuItems() {
    // les noms des icons disponible sur : https://material.io/resources/icons/
    this.title = 'WeathAir';
    this.menus = [
      { link: '/home', label: ' Accueil '},
      { link: '/favorite', label: ' Mes indicateurs '},
      { link: '/forum', label: ' Forum '}
    ];
  }

  onLogoutClick() {
    this.loginService.logout();
    this.router.navigate(['/login', {}]);

  }
  
}
