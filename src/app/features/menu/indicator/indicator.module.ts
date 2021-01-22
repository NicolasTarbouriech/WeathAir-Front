import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { IndicatorComponent } from "./components/indicator.component";
import { SharedModule } from '../../../shared/shared.module';
import { IndicatorRoutingModule } from "./indicator-routing.module";
import { HomeModule } from "../home/home.module";

@NgModule({
    declarations: [IndicatorComponent],
    imports: [
        CommonModule,
        IndicatorRoutingModule, 
        SharedModule, 
        HomeModule
    ]
  })
  export class IndicatorModule { }