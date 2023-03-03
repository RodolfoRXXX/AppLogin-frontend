import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './sections/home/home.component';
import { PageNotFoundComponent } from './sections/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'auth', loadChildren: () => import('./sections/auth/auth.module').then(m => m.AuthModule) },
  { path: 'market', loadChildren: () => import('./sections/market/market.module').then(m => m.MarketModule) },
  { path: 'profile', loadChildren: () => import('./sections/profile/profile.module').then(m => m.ProfileModule) },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
