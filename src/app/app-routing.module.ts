import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/authentication/auth.module').then(m => m.AuthModule)
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
    path: 'home',
    loadChildren: () =>
      import('./features/menu/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'forum',
    loadChildren: () =>
      import('./features/menu/forum/forum.module').then(m => m.ForumModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
