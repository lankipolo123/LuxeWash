import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SplashscrnPageRoutingModule } from './splashscrn-routing.module';

import { SplashscrnPage } from './splashscrn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SplashscrnPageRoutingModule
  ],
  declarations: [SplashscrnPage]
})
export class SplashscrnPageModule {}
