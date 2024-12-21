import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'splashscrn',
    pathMatch: 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tabs/cart',
    loadChildren: () => import('./pages/tabs/cart/cart.module').then(m => m.CartPageModule)
  },
  {
    path: 'tabs/product-details/:id',
    loadChildren: () => import('./pages/tabs/product-details/product-details.module').then(m => m.ProductDetailsPageModule)
  },
  {
    path: 'tabs/profile',
    loadChildren: () => import('./pages/tabs/profile/profile-routing.module').then( m => m.ProfilePageRoutingModule)
  },
  {
    path: 'splashscrn',
    loadChildren: () => import('./splashscrn/splashscrn.module').then( m => m.SplashscrnPageModule)
  },
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }