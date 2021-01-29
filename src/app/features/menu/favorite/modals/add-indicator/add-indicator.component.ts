import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../../authentication/login/core/login.service';
import { ConnectedUser } from '../../../../../shared/models/ConnectedUser';
import { Favorite } from '../../../../../shared/models/Favorite';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { RegisterService } from '../../../../authentication/register/core/register.service';
import { Township } from 'src/app/shared/models/Township';
import { isObject } from 'util';
import { FavoriteService } from '../../favorite.service';
import { ConnectedUserService } from 'src/app/shared/core/connected-user.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-indicator',
  templateUrl: './add-indicator.component.html',
  styleUrls: ['./add-indicator.component.scss']
})
export class AddIndicatorComponent implements OnInit {

  favoriteForm: FormGroup;
  hasError = false;
  checked = false;
  dunnoTownship = false;
  meteo = false;
  air = false;

  filteredOptions: Observable<any[]>;
  options: Township[] = [];
  contentLoading: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataConnectedUser :any,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private changeDetectorRef: ChangeDetectorRef,
    private favoriteService: FavoriteService) { }

  ngOnInit(): void {

    this.loadCities();

    this.favoriteForm = this.formBuilder.group({
      township: ['', Validators.required],
      labelIndicator: ['', Validators.required],
      duration: ['', Validators.required],
      user: [this.dataConnectedUser.connectedUser, Validators.required]
    });
   

    this.filteredOptions = this.favoriteForm.get('township').valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      )
  }

  whatFrom(value) {
    if (value.value === "meteo") {
      this.air = false;
      this.meteo = true;
    } else if (value.value === "air") {
      this.meteo = false;
      this.air = true;
    }
  }

  addToMyIndicators() {
    if (this.favoriteForm.valid) {
      if (this.favoriteForm.value.township.name) {
        this.dunnoTownship = false;
        let fav: Favorite = new Favorite(this.favoriteForm.value);
        this.favoriteService.createFavorite(fav).subscribe(
         favorite => {
            this.favoriteService.sendToFavoriteSub(favorite);
        },
          err => console.log(err)

        );
      } else {
        this.dunnoTownship = true
      }
    } else {
      this.favoriteForm.markAllAsTouched();
    }
  }

  /* -------------------------------------------------------------------------------------------------- */
  /* ---------------------------------Methodes pour autocomplétion des Townships----------------------- */
  /* -------------------------------------------------------------------------------------------------- */
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0)
      .slice(0, 5);
  }

  displayFn(township: any): string {
    return township && township.name ? township.name : '';
  }

  loadCities() {
    return this.registerService.getTownships().subscribe(
      result => {
        this.options = result;
        console.log(result);
        this.contentLoading = false;
        this.changeDetectorRef.detectChanges();
      }, err => {
        this.contentLoading = false;
        this.changeDetectorRef.detectChanges();
        console.log(err);
      }
    )
  }
}
