import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  showSideButton: boolean = false;
  cartNotificationCount: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartNotificationCount = count;
    });
  }
  toggleSideButton() {
    this.showSideButton = !this.showSideButton;
  }

  addToCart(item: CartItem) {
    this.cartService.addToCart(item);
  }

  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item);
  }

  getCartItemCount() {
    return this.cartNotificationCount;
  }
}