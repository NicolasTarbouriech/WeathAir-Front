import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIndicatorComponent } from 'src/app/features/menu/favorite/modals/add-indicator/add-indicator.component';
import { FavoriteService } from '../favorite.service';
import { ConnectedUser } from 'src/app/shared/models/ConnectedUser';
import { LoginService } from 'src/app/features/authentication/login/core/login.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  myFavorites = []

  /* Supprimmer le = quand back réparé */
  connectedUser: ConnectedUser = new ConnectedUser({
    email: "admin@admin.com",
    id: 1,
    pseudo: "Jean-Admin",
    role: { id: 1, label: "ADMINISTRATOR" },
    township: { inseeCode: "3007", name: "Alès", population: 40870 }
  })

  constructor(public dialog: MatDialog, private favoriteService: FavoriteService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    /* Décommenté quand back réparer */
    /* this.loginService.connectedUserObs.subscribe(user => { this.connectedUser = user }); */

    this.favoriteService.getAllFavoriteByConnectedUserId(this.connectedUser.id).subscribe(
      favorites => {
        this.myFavorites = favorites
      },
      err => console.log(err)
    );
  }

  ngOnDestroy(): void { }

  openDialog() {
    let dialogRef = this.dialog.open(AddIndicatorComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

}