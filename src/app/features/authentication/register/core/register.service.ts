import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "./register.model";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { Township } from "./township.model";


const USER_ANONYM  = new User({});

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private userConnectedSub: BehaviorSubject<User> = new BehaviorSubject(USER_ANONYM);
  
  constructor(private httpClient: HttpClient) { }


  register(pseudo : string, email: string, password: string , township : Township ): Observable<User> {
    let connect = { email : email, password : password, pseudo : pseudo, township : township};
    return this.httpClient.post(`${environment.api.BASE_URL}users`,
      connect)
      .pipe(
        map(userServeur => new User(userServeur)),
        tap(col => this.userConnectedSub.next(col) )
      );
  }

  getTownships() : Observable<Township[]>{
    // const township = localStorage.getItem('APP_TOWNSHIPS');
    // if (!!township) { 
    //   return of(JSON.parse(township));
    // }
    return this.httpClient.get<Township[]>(`${environment.api.BASE_URL}townships`);
    // .pipe(
    //   tap(resultat => {
    //   localStorage.setItem('APP_TOWNSHIPS', JSON.stringify(resultat))
    // }))
    }
  

}