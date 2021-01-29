import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/features/authentication/login/core/login.service';
import { FavoriteService } from 'src/app/features/menu/favorite/favorite.service';
import { ConnectedUser } from '../models/ConnectedUser';

@Injectable({
  providedIn: 'root'
})
export class ConnectedUserService {

  connectedUser :ConnectedUser;

  constructor(private loginService :LoginService, private favoriteService :FavoriteService) { }

  findConnectedUser() :Promise<ConnectedUser> {
      return new Promise(
        resolve => {
          this.loginService.getFromUserSub().subscribe(
            user => {
              if (!user.id) {
                this.loginService.getMe().subscribe(userGetme => {
                  resolve(userGetme)
                })
              } else {
                resolve(user)
              }
            },
            err => console.log(err)
          )
        }
      )
  }


  chargeFav(connectedUser :ConnectedUser) {

    this.favoriteService.getAllFavoriteByConnectedUserId(connectedUser.id).subscribe(
      favorites => {
        favorites.forEach(fav=> this.favoriteService.sendToFavoriteSub(fav))
      },
      err => console.log(err)
    );
  } 
}
