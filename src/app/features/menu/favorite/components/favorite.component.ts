import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddIndicatorComponent } from 'src/app/features/modals/add-indicator/add-indicator.component';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit, OnDestroy {

  myIndicators = [];

  constructor(public dialog: MatDialog ) {
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  openDialog() {
    let dialogRef = this.dialog.open(AddIndicatorComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`)
    })
  }
  
}