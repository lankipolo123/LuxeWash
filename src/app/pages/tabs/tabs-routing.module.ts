import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'product-detail/:id', // Adjusted path for product details with an id parameter
        loadChildren: () => import('./product-details/product-details.module').then(m => m.ProductDetailsPageModule)
      },
      {
        path: 'disclaimer', // Adjusted path for product details with an id parameter
        loadChildren: () => import('./disclaimer/disclaimer.module').then(m => m.DisclaimerPageModule)
      },
        
  {
    path: 'company-history',
    loadChildren: () => import('./company-history/company-history.module').then( m => m.CompanyHistoryPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'developers',
    loadChildren: () => import('./developers/developers.module').then( m => m.DevelopersPageModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
      
      {
        path: '',
        redirectTo: 'home', // Default to the home tab
        pathMatch: 'full'
      }
    ]
  },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
