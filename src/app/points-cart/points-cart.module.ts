import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsCartPageRoutingModule } from './points-cart-routing.module';

import { PointsCartPage } from './points-cart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsCartPageRoutingModule
  ],
  declarations: [PointsCartPage]
})
export class PointsCartPageModule {}
