import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'dish/:id',
    loadChildren: () => import('./dish/dish.module').then(m => m.DishPageModule),
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'invite-friends',
    loadChildren: () => import('./invite-friends/invite-friends.module').then( m => m.InviteFriendsPageModule)
  },
  {
    path: 'faqs',
    loadChildren: () => import('./faqs/faqs.module').then( m => m.FaqsPageModule)
  },
  {
    path: 'points',
    loadChildren: () => import('./points/points.module').then( m => m.PointsPageModule)
  },
  {
    path: 'points-dish/:id',
    loadChildren: () => import('./points-dish/points-dish.module').then( m => m.PointsDishPageModule)
  },
  {
    path: 'points-cart',
    loadChildren: () => import('./points-cart/points-cart.module').then( m => m.PointsCartPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
