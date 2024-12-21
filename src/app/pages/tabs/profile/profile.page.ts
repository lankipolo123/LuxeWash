import { Component, OnInit } from '@angular/core';
import { FavoriteItem, FavoriteService } from '../../../services/favorite.service';
import { CheckoutService } from '../../../services/checkout.service'; // Import CheckoutService
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  favoriteProducts: FavoriteItem[] = [];
  orders: any[] = [];
  userName: string = '';
  userPhone: string = '';
  userEmail: string = ''; // To store orders (now from CheckoutService)

  constructor(
    private favoriteService: FavoriteService,
    private checkoutService: CheckoutService, // Inject CheckoutService to get orders
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadData();
    this.loadUserDetails();
  }
  loadUserDetails() {
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.userName = `${userDetails.firstName} ${userDetails.middleInitial} ${userDetails.lastName}`;
    this.userPhone = userDetails.phone || '';
    this.userEmail = userDetails.email || '';
  }


  ionViewWillEnter() {
    this.loadOrders(); // Ensure that orders are fetched when entering the profile page
  }

  loadData() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoriteProducts = this.favoriteService.getFavorites();
  }

  loadOrders() {
    this.orders = this.checkoutService.getCheckoutItems(); // Get orders from CheckoutService
  }

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }

  removeFromFavorites(product: FavoriteItem) {
    this.favoriteService.removeFromFavorites(product);
    this.loadFavorites();
  }

  async openNavigationAlert() {
    const alert = await this.alertController.create({
      header: 'Confirm Log Out',
      message: 'Are you sure you want to Log Out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Canceled');
          },
        },
        {
          text: 'Yes',
          handler: () => {
            this.presentToast();
            this.router.navigate(['/login']);
          },
        },
      ],
    });

    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have logged out successfully.',
      duration: 2000,
      position: 'top',
      color: 'tertiary',
    });
    await toast.present();
  }
}
