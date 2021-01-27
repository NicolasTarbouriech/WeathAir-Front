import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForumComponent } from './components/forum.component';
import { PostComponent } from './post/components/post/post.component';


const routes: Routes = [
  {
    path: '',
    component: ForumComponent,
  },
  {
    path: '/posts',
    component : PostComponent
  },
  
  {
    path : '**',
    redirectTo : ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
