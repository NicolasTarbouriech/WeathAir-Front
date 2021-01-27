
import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, mapTo, } from 'rxjs/operators';
import { User } from './login.model';
import { Tokens } from './tokens.models';

/* Anomy user */
const USER_ANONYM = new User({});

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userConnectedSub: BehaviorSubject<User> = new BehaviorSubject(USER_ANONYM);

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private httpClient: HttpClient) {
  }





  get connectedUserObs(): Observable<User> {
    return this.userConnectedSub.asObservable();
  }

  /**
   * Service permettant de vérifier si un collegue est authentifié.
   *
   * Une requête HTTP est déclenchée pour récupérer le collègue connecté s'il n'est pas en cache.
   *
   */
  verifierAuthentification(): Observable<User> {
    return this.userConnectedSub.getValue().notConnected() ?
      this.httpClient.get<User>(`${environment.api.BASE_URL}users/me`, { withCredentials: true })
        .pipe(
          map(userServer => new User(userServer)),
          tap(user => this.userConnectedSub.next(user)),
          catchError(err => of(USER_ANONYM))
        ) : of(this.userConnectedSub.getValue());
  }

  /**
   * Connexion de l'utilisateur.
   *
   * Le serveur provoque la création du cookie AUTH-TOKEN.
   *
   */
  login(email: string, password: string): Observable<any> {
    let connect = { username: email, password: password };

    return this.httpClient.post(`${environment.api.BASE_URL}login`, connect)
      .pipe(
        map(userServeur => new User(userServeur)),
        tap(col => this.userConnectedSub.next(col))
      );
  }

  /**
   * Déconnexion de l'utilisateur.
   *
   * Le serveur provoque la suppression du cookie AUTH-TOKEN.
   *
   */
  seDeconnecter() {

    const config = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    localStorage.removeItem("idUser");
    localStorage.removeItem("roleUser");

    return this.httpClient.post<User>(`${environment.api.BASE_URL}`, null, config)
      .pipe(
        tap(col => this.userConnectedSub.next(USER_ANONYM))
      );

  }
}
