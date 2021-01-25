
import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of,BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {  map , tap, catchError,  } from 'rxjs/operators';
import { User } from './login.model';



const USER_ANONYM  = new User({});

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userConnectedSub: BehaviorSubject<User> = new BehaviorSubject(USER_ANONYM);

  constructor(private httpClient: HttpClient) {
   }

  get collegueConnecteObs(): Observable<User> {
    return this.userConnectedSub.asObservable();
  }

  /**
   * Service permettant de vérifier si un collegue est authentifié.
   *
   * Une requête HTTP est déclenchée pour récupérer le collègue connecté s'il n'est pas en cache.
   *
   */
  checkAuthentication(): Observable<User> {
    return this.userConnectedSub.getValue().notConnected() ?
            this.httpClient.get<User>(`${environment.api.BASE_URL}
            `, {withCredentials: true})
                  .pipe(
                    
                    map(utilisateurServeur => new User(utilisateurServeur)),
                    tap(u => this.userConnectedSub.next(u)),
                    catchError(err => of(USER_ANONYM))
                  ) :     of(this.userConnectedSub.getValue());
  }

  /**
   * Connexion de l'utilisateur.
   *
   * Le serveur provoque la création du cookie AUTH-TOKEN.
   *
   */
  login(email: string, password: string): Observable<User> {
    let connect = { username : email, password : password};
    return this.httpClient.post(`${environment.api.BASE_URL}login`,
      connect)
      .pipe(
        map(userServeur => new User(userServeur)),
        tap(col => this.userConnectedSub.next(col) )
      );
  }

  // isAuthenticated() {

  //   if ( localStorage.getItem("idUser") != null ){
  //     return true;
  //   } else {
  //     return false
  //   }
  // }

}
