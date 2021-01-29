import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { HomeStorageService } from '../../../home/core/home-storage.service';
import { IndicatorService } from '../../core/indicator-service';

@Component({
  selector: 'app-meteo-indicator',
  templateUrl: './meteo-indicator.component.html',
  styleUrls: ['./meteo-indicator.component.scss'],
})
export class MeteoIndicatorComponent implements OnInit, OnDestroy {

  @Input()
  township: string;
  description: string;
  temperature: number;
  icon: string;
  descriptionFR: string;

  constructor(private indicatorService: IndicatorService, private homeStorageService: HomeStorageService) {
  }

  ngOnInit(): void {
    this.updateData(this.township);
    this.homeStorageService.getTownshipStream().pipe(filter(elem => {
      return !!elem;
    })).subscribe(
      res => {
        this.updateData(res);
      }, 
      err => {
        console.log(err);
      });
      
  }

  ngOnDestroy(): void {}
  
  getIcon(){
    if (this.description === 'clear sky') {
      this.icon = 'assets/meteo-signs/1-sunny_day.png';
    } else if (this.description === 'few clouds' || this.description === 'scattered clouds' || this.description === 'broken clouds' || this.description === 'overcast clouds' || this.description === 'few clouds' || this.description === 'mist') {
      this.icon = 'assets/meteo-signs/2-partly_cloudy_day.png';
    } else if (this.description === 'rain') {
      this.icon = 'assets/meteo-signs/3-rain_sunny_day.png';
    }
    else if (this.description === 'shower rain') {
      this.icon = 'assets/meteo-signs/4-heavy_rain.png';
    }
    else if (this.description === 'thunderstorm') {
      this.icon = 'assets/meteo-signs/5-thunder.png';
    } else {
      this.icon = 'assets/meteo-signs/6-snow.png';
    }
  }

  getDescritptionFR(){
    if (this.description === 'clear sky') {
      this.descriptionFR = 'Ensoleillé';
    } else if (this.description === 'few clouds' || this.description === 'scattered clouds' || this.description === 'broken clouds' || this.description === 'overcast clouds' || this.description === 'few clouds' || this.description === 'mist') {
      this.descriptionFR = 'Quelques nuages';
    } else if (this.description === 'rain') {
      this.descriptionFR = 'Pluie légère';
    }
    else if (this.description === 'shower rain') {
      this.descriptionFR = 'Pluie';
    }
    else if (this.description === 'thunderstorm') {
      this.descriptionFR = 'Orage';
    } else {
      this.descriptionFR = 'Neige';
    }
  }

  updateData(townshipName: string){
    this.indicatorService.retrieveMeteoIndicator(townshipName).subscribe(
      res => {
        this.description = res[0].description;
        this.temperature = res[0].temperature;
        this.getIcon();
        this.getDescritptionFR();
      }, 
      err => {
        console.log(err)
      }
    );
  }

}