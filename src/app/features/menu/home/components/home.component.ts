import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Township } from 'src/app/features/authentication/register/core/township.model';
import { GpsCoordinates } from '../../indicator/core/indicator.model';
import { HomeStorageService } from '../core/home-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  searchForm : FormGroup;
  errorInForm : boolean;
  options : Township[] = [];
  filteredOptions: Observable<any[]>;
  coordinatesList: GpsCoordinates[];
  center = {
    lat : 43.3925,
    lng : 2.8834
  }

  constructor(private formBuilder: FormBuilder, private router: Router, private homeStorageService: HomeStorageService, private changeDetectorRef: ChangeDetectorRef) {
    
  }

  ngOnInit(): void { 
    this.searchForm = this.formBuilder.group({
      township: ['', Validators.required]
    })
    this.errorInForm = false;
    this.loadCities();
    this.loadCoordinates();
    this.filteredOptions = this.searchForm.get('township').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  ngOnDestroy(): void {}

  btnClick () {

    if (!!this.searchForm.get('township').value.name) {
      this.errorInForm = false;
      this.homeStorageService.setTownship(this.searchForm.get('township').value.name);
      this.router.navigate(['/indicators', {township: this.searchForm.get('township').value.name}]);
    } else if (!!this.searchForm.get('township').value && this.options.some(e => e.name === this.searchForm.get('township').value) ) {
      this.errorInForm = false;
      this.homeStorageService.setTownship(this.searchForm.get('township').value);
      this.router.navigate(['/indicators', {township: this.searchForm.get('township').value}]);
    }
    else {
      this.errorInForm = true;
    }
    
  }

  displayFn(township: any): string {
    return township && township.name ? township.name : '';
  }

  loadCities() {
    return this.homeStorageService.getTownships().subscribe( 
      result => {
        this.options = result;
        this.changeDetectorRef.detectChanges();
      }, err => {
        this.changeDetectorRef.detectChanges();
        console.log(err);
      }
    )
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)
    .slice(0, 5);
  }

  loadCoordinates() {
    return this.homeStorageService.getGpsCoordinates().subscribe(
      result => {
        this.coordinatesList = result;
        console.log(this.coordinatesList);
      }, err => {
        console.log(err)
      }
    )
  }

  
}
