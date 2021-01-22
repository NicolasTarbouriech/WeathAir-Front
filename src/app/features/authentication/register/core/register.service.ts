import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "./register.model";
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";


const USER_ANONYM  = new User({});

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  
  private userConnectedSub: BehaviorSubject<User> = new BehaviorSubject(USER_ANONYM);

  constructor(private httpClient: HttpClient) { }


  register(pseudo : string, email: string, password: string, township :string  ): Observable<User> {
    let connect = { username : email, password : password};
    return this.httpClient.post(`${environment.api.BASE_URL}users`,
      connect)
      .pipe(
        map(userServeur => new User(userServeur)),
        tap(col => this.userConnectedSub.next(col) )
      );
  }

}