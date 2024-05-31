import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointsCartPage } from './points-cart.page';

const routes: Routes = [
  {
    path: '',
    component: PointsCartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointsCartPageRoutingModule {}
