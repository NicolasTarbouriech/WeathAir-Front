import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from '../../../shared/shared.module';
import { HomeRoutingModule } from "./home-routing.module";
import { GoogleMapsModule } from "@angular/google-maps";
import { HomeComponent } from "./components/home.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";

@NgModule({
    declarations: [HomeComponent],
    imports: [
      CommonModule,
      GoogleMapsModule,
      HomeRoutingModule, 
      MatAutocompleteModule,
      SharedModule
    ], 
    exports: [HomeComponent]
    })
  export class HomeModule { }