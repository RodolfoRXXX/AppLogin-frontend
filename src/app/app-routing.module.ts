import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./sections/auth/auth.module').then(m => m.AuthModule) },
  { path: 'market', loadChildren: () => import('./sections/market/market.module').then(m => m.MarketModule) },
  { path: 'profile', loadChildren: () => import('./sections/profile/profile.module').then(m => m.ProfileModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
