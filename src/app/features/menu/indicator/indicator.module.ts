import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IndicatorComponent } from "./components/indicator.component";
import { MeteoIndicatorComponent } from "./components/meteo-indicator/meteo-indicator.component"
import { AirIndicatorComponent } from "./components/air-indicator/air-indicator.component"
import { SharedModule } from '../../../shared/shared.module';
import { IndicatorRoutingModule } from "./indicator-routing.module";
import { HomeModule } from "../home/home.module";
import { GoogleMapsModule } from "@angular/google-maps";

@NgModule({
    declarations: [
        IndicatorComponent,
        MeteoIndicatorComponent, 
        AirIndicatorComponent
    ],
    imports: [
        CommonModule,
        GoogleMapsModule,
        IndicatorRoutingModule, 
        SharedModule, 
        HomeModule
    ]
  })
  export class IndicatorModule { }