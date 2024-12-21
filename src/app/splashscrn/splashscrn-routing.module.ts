import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashscrnPage } from './splashscrn.page';

const routes: Routes = [
  {
    path: '',
    component: SplashscrnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashscrnPageRoutingModule {}
