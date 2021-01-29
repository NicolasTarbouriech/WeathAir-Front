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
  indicatorLabel: string;
  durationLabel:string;

// ===================================================

options = {
  legend: {
    data: ['X-1', 'X-2', 'X-3', 'X-4', 'X-5']
  },
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
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
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
      areaStyle: { normal: {} },
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'X-2',
      type: 'line',
      stack: 'counts',
      areaStyle: { normal: {} },
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'X-3',
      type: 'line',
      stack: 'counts',
      areaStyle: { normal: {} },
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'X-4',
      type: 'line',
      stack: 'counts',
      areaStyle: { normal: {} },
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'X-5',
      type: 'line',
      stack: 'counts',
      label: {
        normal: {
          show: true,
          position: 'top'
        }
      },
      areaStyle: { normal: {} },
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
};

//================================================================


  constructor(private favoriteService: FavoriteService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('idFav'));
    this.favoriteService.getFavoriteById(this.id).subscribe(
      res => {
        console.log(res[0]);
        this.favorite = res[0];
        this.getDurationLabel();
        this.getIndicatorLabel();
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

}
