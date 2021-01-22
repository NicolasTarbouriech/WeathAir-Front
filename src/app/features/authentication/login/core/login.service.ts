import { api } from '../../../../core/api/api.vars';
import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  LoginRequest,
 LoginToken,
  UserInfo,
} from './login.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  retrieveAuthToken(
    request: LoginRequest,
  ): Observable<LoginToken> {
    const body = new HttpParams()
      .set('password', request.password)
      .set('email', request.username);

    return this.httpClient.post<LoginToken>(
      `${environment.api.BASE_URL}${environment.api.API_VERSION}${api.endpoints.auth.LOGIN}`,
      body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    );
  }


  retrieveUserData(token : LoginToken): Observable<UserInfo> {
    return this.httpClient
      .get<UserInfo>(
        `${environment.api.BASE_URL}${environment.api.API_VERSION}${api.endpoints.auth.ME}`,
        {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${token.access_token}`)
        }
      )
      .pipe(share());
  }

  // seConnecter(email: string, mdp: string): Observable<UserInfo> {

  //   const config = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     })
  //   };

  //   return this.httpClient.post(`${environment.api.BASE_URL}${environment.api.API_VERSION}`,
  //     new HttpParams().set('username', email).set('password', mdp), config)
  //     .pipe(
  //       map(colServeur => new UserInfo(colServeur)),
  //       tap(col => this.collegueConnecteSub.next(col) )
  //     );
  // }



  logout(): Observable<any> {
    return of(null);
  }
}
