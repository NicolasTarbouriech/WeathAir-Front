import { SharedModule } from './shared/shared.module';
import { environment } from './../environments/environment.prod';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './features/menu/main/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './features/menu/home/components/home.component';
import { HomeModule } from './features/menu/home/home.module';
import { AddIndicatorComponent } from './features/menu/favorite/modals/add-indicator/add-indicator.component';
import { CguComponent } from './features/authentication/cgu/cgu/cgu.component';
import { NgxEchartsModule } from "ngx-echarts";
import * as echarts from 'echarts';


@NgModule({
  declarations: [
    AppComponent, 
    MenuComponent, 
    CguComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,
    HomeModule,
    NgxEchartsModule.forRoot({echarts}),

    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          name: 'MY APP'
        }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
