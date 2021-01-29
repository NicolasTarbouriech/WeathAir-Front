import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../../favorite.service'
import { Favorite } from '../../../../../../shared/models/Favorite'
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: number;
  favorite: Favorite;

  constructor(private favoriteService: FavoriteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('idFav'));
    this.favoriteService.getFavoriteById(this.id).subscribe(
      res => {
        console.log(res[0]);
        this.favorite = res[0];
      }, 
      err => {
        console.log(err);
      }
    )
  }

}
