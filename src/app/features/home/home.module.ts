import { MessengerComponent } from './messenger/components/messenger.component';
import { FeedComponent } from './feed/components/feed.component';
import { HomeComponent } from './main/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    HomeComponent,
    FeedComponent,
    MessengerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule,
    MatTabsModule,
  ]
})
export class HomeModule {}
