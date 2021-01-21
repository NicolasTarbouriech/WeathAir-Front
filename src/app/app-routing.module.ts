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
      import('./features/authentication/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./features/authentication/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/menu/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'home/forum',
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
