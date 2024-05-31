import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PointsDishPage } from './points-dish.page';

const routes: Routes = [
  {
    path: '',
    component: PointsDishPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointsDishPageRoutingModule {}
