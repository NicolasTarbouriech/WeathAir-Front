import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIndicatorComponent } from 'src/app/features/menu/favorite/modals/add-indicator/add-indicator.component';
import { FavoriteService } from '../favorite.service';
import { ConnectedUser } from 'src/app/shared/models/ConnectedUser';
import { LoginService } from 'src/app/features/authentication/login/core/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { Favorite } from 'src/app/shared/models/Favorite';
import { ConnectedUserService } from 'src/app/shared/core/connected-user.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {


  myFavorites = [];
  displayedColumns: string[] = ['id','township', 'type', 'duration', 'labelIndicator', 'details', 'update', 'delete'];
  dataSource = new MatTableDataSource<Favorite>();

  connectedUser: ConnectedUser

  success = false;

  constructor(
    public dialog: MatDialog, 
    private favoriteService: FavoriteService,
    private ConnectedUserService: ConnectedUserService,
    private router :Router    
    ) {}

  ngOnInit(): void {
    this.ConnectedUserService.findConnectedUser().then(user => {
      this.connectedUser = user;
      this.ConnectedUserService.chargeFav(user);
    })

    this.getMyFavorites()
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
    this.dataSource.data = favorites.reverse() as Favorite[];
  }

  getMyFavorites() {
    this.favoriteService.getFromFavoriteSub().subscribe(
      favoritesArray => {
        this.myFavorites.push(favoritesArray);
        this.updateData(this.myFavorites);
      }
    )
  }

  showDetails(idFav :number) {
    this.router.navigate(['/details', {idFavorite : idFav}])
  }

  openDialog() {
    let dialogRef = this.dialog.open(AddIndicatorComponent, {
      data : {connectedUser : this.connectedUser},
      width : '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'true') {
        this.success = true
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


}