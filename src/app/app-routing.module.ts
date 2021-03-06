import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { CguComponent } from './features/authentication/cgu/cgu/cgu.component';
import { DetailsComponent } from './features/menu/favorite/components/details/details/details.component';
import { PostComponent } from './features/menu/forum/post/components/post/post.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/authentication/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'cgu',
   component : CguComponent
  },
  {
    path: 'indicators',
    loadChildren: () =>
      import('./features/menu/indicator/indicator.module').then(m => m.IndicatorModule)
  },
  {
    path: 'favorite',
    loadChildren: () =>
      import('./features/menu/favorite/favorite.module').then(m => m.FavoriteModule)
  },
  {
    path: 'details',
    component : DetailsComponent
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/menu/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'forum',
    loadChildren: () =>
      import('./features/menu/forum/forum.module').then(m => m.ForumModule)
  },
  {
    path: ':id/posts',
   component : PostComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
