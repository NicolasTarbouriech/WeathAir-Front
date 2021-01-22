import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { LoginService } from "./login.service";

@Injectable({
    providedIn: 'root'
  })
  export class LoginGuard implements CanActivate{
  
    constructor(private _loginService: LoginService, private _router: Router) {
    }
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this._loginService.checkAuthentication()
        .pipe(
          map(user => !user.notConnected()),
          tap(estConnecte => {
            if (!estConnecte) {
              this._router.navigate(['/login']);
            }
          })
        );
    }
  
  }