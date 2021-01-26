import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { IndicatorService } from '../../core/indicator-service';

@Component({
  selector: 'app-air-indicator',
  templateUrl: './air-indicator.component.html',
  styleUrls: ['./air-indicator.component.scss'],
})
export class AirIndicatorComponent implements OnInit, OnDestroy {

  @Input()
  township: string;
  aqi : number;

  constructor(private indicatorService: IndicatorService) {
  }

  ngOnInit(): void {
    this.indicatorService.retrieveLatestAirIndicator(this.township).subscribe(
      res => {
        this.aqi = res[0].aqi;
      }, 
      err => {
        console.log(err)
      }
    );
  }

  ngOnDestroy(): void {}
  
}