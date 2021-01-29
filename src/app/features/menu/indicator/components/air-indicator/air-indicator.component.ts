import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { filter } from 'rxjs/operators';
import { HomeStorageService } from '../../../home/core/home-storage.service';
import { IndicatorService } from '../../core/indicator-service';
import { Township } from '../../core/indicator.model';

@Component({
  selector: 'app-air-indicator',
  templateUrl: './air-indicator.component.html',
  styleUrls: ['./air-indicator.component.scss'],
})
export class AirIndicatorComponent implements OnInit, OnDestroy {

  @Input()
  township: string;
  aqi : number;

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

  updateData(townshipName: string) {
    this.indicatorService.retrieveLatestAirIndicator(townshipName).subscribe(
      res => {
        this.aqi = res[0].aqi;
      }, 
      err => {
        this.aqi = 0;
        console.log(err)
      }
    );
  }
  
}