import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CartService, CartItem } from '../../../services/cart.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertController, IonPopover } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {
  @ViewChild('popover', { static: false }) popover!: IonPopover; // Reference to the popover
  cartItems: CartItem[] = []; // Array to hold cart items
  private cartItemsSubscription: Subscription | null = null; // Subscription for cart items
  isOpen = false; // State for popover visibility
  currentItem!: CartItem; // Track the item for the popover

  constructor(
    private cartService: CartService,
    private router: Router,
    private alertController: AlertController // Inject AlertController
  ) {}

  ngOnInit() {
    // Subscribe to cart items from the service
    this.cartItemsSubscription = this.cartService.getCartItems().subscribe((items: CartItem[]) => {
      this.cartItems = items; // Update cart items list
    });
  }

  ngOnDestroy() {
    // Unsubscribe to prevent memory leaks
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
  }

  // Method to present the popover for quantity warning
  presentPopover(e: Event, item: CartItem) {
    this.currentItem = item; // Store the current item for reference
    this.popover.event = e; // Set the event for positioning the popover
    this.isOpen = true; // Open the popover
  }

  // Method to update quantity
  updateQuantity(item: CartItem, newQuantity: number, event: Event) {
    if (newQuantity < 1) {
      this.presentPopover(event, item); // Show popover if trying to set quantity to 0
    } else {
      const updatedQuantity = Math.max(newQuantity, 1);
      this.cartService.updateQuantity(item, updatedQuantity); // Update the quantity
    }
  }

  // Confirm removal of the item
  confirmRemove() {
    this.cartService.removeFromCart(this.currentItem); // Remove the item from the cart
    this.isOpen = false; // Close the popover
  }

  // Method to clear the cart
  clearCart() {
    this.cartService.clearCart(); // Clear all items from the cart
  }

  // Method to get the total price of items in the cart
  getTotalPrice(): number {
    const totalPrice = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    return Number(totalPrice.toFixed(2)); // Return total price rounded to two decimal places
  }

  async openCheckoutAlert() {
    const totalPrice = this.getTotalPrice(); // Calculate total price

    const alert = await this.alertController.create({
      header: 'Confirm Checkout',
      message: `Are you sure you want to proceed with the purchase of ₱${totalPrice}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Checkout',
          handler: () => {
            // Navigate to CheckoutPage and pass cart items as queryParams
            this.router.navigate(['tabs/checkout'], {
              queryParams: {
                items: JSON.stringify(this.cartItems), // Pass the cart items as a JSON string
                totalPrice: totalPrice.toString(), // Pass the total price as a string
              },
            });

            // Call checkout (clear cart, etc.)
            this.cartService.checkout();
          },
        },
      ],
    });

    await alert.present();
  }

  // Method to remove an item from the cart
  removeFromCart(item: CartItem) {
    this.cartService.removeFromCart(item); // Call the service to remove the item
  }
}
