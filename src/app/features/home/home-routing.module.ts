import { MessengerComponent } from './messenger/components/messenger.component';
import { FeedComponent } from './feed/components/feed.component';
import { HomeComponent } from './main/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [

      {
        path: 'feed',
        component: FeedComponent,
      },

      {
        path: 'messenger',
        component: MessengerComponent,
      },
      {
        path: '**',
        redirectTo: 'feed'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
