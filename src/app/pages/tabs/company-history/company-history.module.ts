import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompanyHistoryPageRoutingModule } from './company-history-routing.module';

import { CompanyHistoryPage } from './company-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CompanyHistoryPageRoutingModule
  ],
  declarations: [CompanyHistoryPage]
})
export class CompanyHistoryPageModule {}
