import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIndicatorComponent } from 'src/app/features/menu/favorite/modals/add-indicator/add-indicator.component';
import { FavoriteService } from '../favorite.service';
import { ConnectedUser } from 'src/app/shared/models/ConnectedUser';
import { LoginService } from 'src/app/features/authentication/login/core/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { Favorite } from 'src/app/shared/models/Favorite';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {


  myFavorites = [];
  displayedColumns: string[] = ['id','township', 'type', 'duration', 'labelIndicator', 'details', 'update', 'delete'];
  dataSource = new MatTableDataSource<Favorite>();
  connectedUser: ConnectedUser;

  constructor(
    public dialog: MatDialog, 
    private favoriteService: FavoriteService, 
    private loginService: LoginService,
    private router :Router    
    ) {

  }

  ngOnInit(): void {

    this.loginService.getFromUserSub().subscribe(
      user => {
        if (!user.id) {
          this.loginService.getMe().subscribe(user => {
            this.favoriteService.getAllFavoriteByConnectedUserId(user.id).subscribe(
              favorites => {
                favorites.forEach(fav=> this.favoriteService.sendToFavoriteSub(fav))
              },
              err => console.log(err)
            );
          })
        } else {
          this.favoriteService.getAllFavoriteByConnectedUserId(user.id).subscribe(
            favorites => {
              favorites.forEach(fav=> this.favoriteService.sendToFavoriteSub(fav))
            },
            err => console.log(err)
          );
        }
      },
      err => console.log(err)
    );

    this.favoriteService.getFromFavoriteSub().subscribe(
      favoritesArray => {
        this.myFavorites.push(favoritesArray);
        this.updateData(this.myFavorites);
      }
    )
  }

  ngOnDestroy(): void { }

  updateData(favorites :Favorite[]) {
    favorites.forEach(fav => {
      switch (fav.labelIndicator) {
        case "temperature":
        case "windSpeed":
        case "windDeg":
        case "humidity":
            fav.type = "Météorologique"
          break;
        case "aqi":
        case "no2":
        case "o3":
        case "pm10":
            fav.type = "Qualité de l'air"
          break;
      }
    })
    this.dataSource.data = favorites as Favorite[];
  }

  showDetails(idFav :number) {
    this.router.navigate(['/details', {idFavorite : idFav}])
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddIndicatorComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}