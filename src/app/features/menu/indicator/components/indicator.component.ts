import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HomeStorageService } from '../../home/core/home-storage.service';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit, OnDestroy {

  township: string;

  constructor(private homeStorageService: HomeStorageService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.township = this.route.snapshot.paramMap.get('township');
    this.homeStorageService.getTownshipStream().pipe(filter(elem => {
      return !!elem;
    })).subscribe(
      res => {
        this.township = res;
      }, 
      err => {
        console.log(err);
      });
  }

  ngOnDestroy(): void {}
  
}