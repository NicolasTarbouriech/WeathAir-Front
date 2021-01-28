import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Favorite } from 'src/app/shared/models/Favorite';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private httpClient: HttpClient) { }

  /* It post the new custom indicator in database */
  createFavorite(myNewFavorite :Favorite) :Observable<Favorite> {
    /* Fonctionne pas */
    return this.httpClient.post<Favorite>(`${environment.api.BASE_URL}favorites`, myNewFavorite);
  }

  /* Return all the custum indicators of the connected user */
  getAllFavoriteByConnectedUserId(connectedUserId :number) :Observable<Favorite[]> {
    return this.httpClient.get<Favorite[]>(`https://demo6385207.mockable.io/favorites/user%3Fid=${connectedUserId}`);
  }
}
