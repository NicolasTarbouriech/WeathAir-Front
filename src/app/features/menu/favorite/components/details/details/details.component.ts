import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../../../favorite.service'
import { Favorite } from '../../../../../../shared/models/Favorite'
import { ActivatedRoute } from '@angular/router';
import { IndicatorService } from 'src/app/features/menu/indicator/core/indicator-service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: number;
  favorite: Favorite;
  indicatorLabel: string;
  durationLabel:string;
  options = {};
  hasErrors = false;

  constructor(private favoriteService: FavoriteService, private indicatorService: IndicatorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('idFavorite'));
    this.favoriteService.getFavoriteById(this.id).subscribe(
      res => {
        console.log(res[0]);
        this.favorite = res[0];
        this.getDurationLabel();
        this.getIndicatorLabel();
        this.retrieveFavoriteData();
      }, 
      err => {
        console.log(err);
      }
    );
  }

  getDurationLabel(){
    if (this.favorite.duration == "day"){
      this.durationLabel = "les dernières 24h";
    } else if (this.favorite.duration == "week") {
      this.durationLabel = "la dernière semaine";
    } else if (this.favorite.duration == "month") {
      this.durationLabel = "le dernier mois";
    } else {
      this.durationLabel = "la dernière année";
    }
  }

  getIndicatorLabel(){
    switch (this.favorite.labelIndicator) {
      case "aqi":
        this.indicatorLabel = "ATMO";
        break;
      case "no2":
        this.indicatorLabel = "NO2";
        break;
      case "o3":
        this.indicatorLabel = "O3";
        break;
      case "pm10":
        this.indicatorLabel = "PM10";
        break;
      case "temperature":
        this.indicatorLabel = "Température";
        break;
      case "windSpeed":
        this.indicatorLabel = "Vitesse du vent";
        break;
      case "windDeg":
        this.indicatorLabel = "Direction du vent";
        break;
      case "humidity":
        this.indicatorLabel = "Humidité";
        break;
    }
  }

  retrieveFavoriteData() {
    // this.indicatorService.retrieveLatestAirIndicator(this.favorite.township.name).subscribe(
    //   res => {
    //     this.hasErrors = false;
    //     console.log(res);
    //   }, 
    //   err => {
    //     this.hasErrors=true;
    //     console.log(this.hasErrors);
    //     console.log(err);
    //   }
    // );

    this.options = {
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['1h', '3h', '5h', '7h', '9h', '11h', '13h']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'X-1',
          type: 'line',
          stack: 'counts',
          areaStyle: {},
          data: [12, 13, 10, 13, 9, 23, 21]
        }
      ]
    };
  }

}
