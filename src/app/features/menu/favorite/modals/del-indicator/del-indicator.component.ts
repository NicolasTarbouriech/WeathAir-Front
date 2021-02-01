import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConnectedUserService } from 'src/app/shared/core/connected-user.service';
import { ConnectedUser } from 'src/app/shared/models/ConnectedUser';
import { Favorite } from 'src/app/shared/models/Favorite';
import { FavoriteService } from '../../favorite.service';

@Component({
  selector: 'app-del-indicator',
  templateUrl: './del-indicator.component.html',
  styleUrls: ['./del-indicator.component.scss']
})
export class DelIndicatorComponent implements OnInit {

  favToDel :Favorite
  connectedUser :ConnectedUser;

  response = { }

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataFavoriteToDel :any,
    private favoriteService :FavoriteService,
    private connectedUserService : ConnectedUserService
    ) { }

  ngOnInit(): void {
    this.favToDel = this.dataFavoriteToDel.favoriteToDel
    this.connectedUserService.findConnectedUser().then(
      user => {
        this.connectedUser = user
        this.response = {
          msg : "true",
          idFav : this.favToDel.id
        }
      }
    )

  }

  deleteFavorite() {
    this.favoriteService.deleteFavoriteById(this.dataFavoriteToDel.favoriteToDel.id).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

}
