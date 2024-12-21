import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyHistoryPage } from './company-history.page';

const routes: Routes = [
  {
    path: '',
    component: CompanyHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyHistoryPageRoutingModule {}
