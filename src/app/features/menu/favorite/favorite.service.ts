import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Favorite } from 'src/app/shared/models/Favorite';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoriteSubject = new Subject<Favorite>()

  constructor(private httpClient: HttpClient) { }

  /* It post the new custom indicator in database */
  createFavorite(myNewFavorite :Favorite) :Observable<Favorite> {
    return this.httpClient.post<Favorite>(`${environment.api.BASE_URL}favorites`, myNewFavorite, {withCredentials : true});
  }

  /* Return all the custum indicators of the connected user */
  getAllFavoriteByConnectedUserId(connectedUserId :number) :Observable<Favorite[]> {
    return this.httpClient.get<Favorite[]>(`${environment.api.BASE_URL}favorites/user?id=${connectedUserId}`, {withCredentials : true});
  }

  /* Update a favorite by id */
  updateFavoriteById(idFav : number) {
    return this.httpClient.put<Favorite>(`${environment.api.BASE_URL}${idFav}`, {withCredentials : true})
  }

  /* Delete a favorite by id */
  deleteFavoriteById(idFav : number) {
    return this.httpClient.delete<Favorite>(`${environment.api.BASE_URL}${idFav}`, {withCredentials : true})
  }

  sendToFavoriteSub(favorite :Favorite) {
    this.favoriteSubject.next(favorite);
  }

  getFromFavoriteSub() {
    return this.favoriteSubject.asObservable();
  }
}
