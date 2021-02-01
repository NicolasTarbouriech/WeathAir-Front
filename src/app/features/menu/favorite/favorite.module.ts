import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FavoriteComponent } from "./components/favorite.component";
import { SharedModule } from '../../../shared/shared.module';
import { FavoriteRoutingModule } from "./favorite-routing.module";
import { AddIndicatorComponent } from "./modals/add-indicator/add-indicator.component";
import { DetailsComponent } from './components/details/details/details.component';
import { NgxEchartsModule } from "ngx-echarts";
import * as echarts from 'echarts';
import { DelIndicatorComponent } from './modals/del-indicator/del-indicator.component';

@NgModule({
    declarations: [FavoriteComponent, AddIndicatorComponent, DetailsComponent, DelIndicatorComponent],
    imports: [
        CommonModule,
        FavoriteRoutingModule, 
        SharedModule, 
        NgxEchartsModule.forRoot({echarts})
    ]
  })
  export class FavoriteModule { }