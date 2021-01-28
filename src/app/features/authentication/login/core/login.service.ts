
import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, catchError, mapTo, } from 'rxjs/operators';
import { User } from './login.model';
import { Tokens } from './tokens.models';
import { ConnectedUser } from 'src/app/shared/models/ConnectedUser';

/* Anomy user */
const USER_ANONYM = new ConnectedUser({});

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private userConnectedSub: BehaviorSubject<ConnectedUser> = new BehaviorSubject(USER_ANONYM);

  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private loggedUser: string;

  constructor(private httpClient: HttpClient) {
  }





  get connectedUserObs(): Observable<ConnectedUser> {
    return this.userConnectedSub.asObservable();
  }

  /**
   * Service permettant de vérifier si un collegue est authentifié.
   *
   * Une requête HTTP est déclenchée pour récupérer le collègue connecté s'il n'est pas en cache.
   *
   */
  verifierAuthentification(): Observable<ConnectedUser> {
    return this.userConnectedSub.getValue().notConnected() ?
      this.httpClient.get<ConnectedUser>(`${environment.api.BASE_URL}users/me`)
        .pipe(
          map(userServer => new ConnectedUser(userServer)),
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
    let connect = { username : email, password : password};
  
    return this.httpClient.post(`${environment.api.BASE_URL}login`, connect, {withCredentials: true})
      .pipe(
        map(userServeur => new User(userServeur)),
        tap(user => this.userConnectedSub.next(user))
      );
  }

  getMe() :Observable<Object> {
    return this.httpClient.get(`${environment.api.BASE_URL}users/me`, {withCredentials: true})
  }

  /**
   * Déconnexion de l'utilisateur.
   *
   * Le serveur provoque la suppression du cookie AUTH-TOKEN.
   *
   */
  logout() {
    return this.httpClient.get(`${environment.api.BASE_URL}logout`, {withCredentials: true})
      .pipe(
        tap(() => {
          console.log('on est bien dedans');
          this.userConnectedSub.next(null);})
      );

  }
}
