import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomeComponent } from "./components/home.component";
import { SharedModule } from '../../../shared/shared.module';
import { HomeRoutingModule } from "./home-routing.module";
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
    declarations: [HomeComponent],
    imports: [
      CommonModule,
      GoogleMapsModule,
      HomeRoutingModule, 
      SharedModule
    ]
  })
  export class HomeModule { }