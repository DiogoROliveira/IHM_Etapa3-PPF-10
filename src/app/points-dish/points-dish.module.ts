import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PointsDishPageRoutingModule } from './points-dish-routing.module';

import { PointsDishPage } from './points-dish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PointsDishPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PointsDishPage]
})
export class PointsDishPageModule {}
