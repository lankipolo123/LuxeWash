import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem, CartService } from '../../../services/cart.service';  // Adjust the path accordingly
import { CheckoutService } from '../../../services/checkout.service';  // Import CheckoutService

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  checkoutItems: CartItem[] = []; // To store cart items passed from CartPage
  totalPrice: number = 0; // To store the total price

  // Declare form variables
  name: string = '';
  contactNumber: string = '';
  address: string = '';
  paymentOption: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService, // Inject the CartService to handle cart operations
    private checkoutService: CheckoutService  // Inject CheckoutService to save the checkout items
  ) {}

  ngOnInit() {
    // Retrieve query parameters passed from CartPage
    this.route.queryParams.subscribe((params) => {
      if (params['items']) {
        // Parse the cart items and the total price from queryParams
        this.checkoutItems = JSON.parse(params['items']); // Parse items as an array
        this.totalPrice = parseFloat(params['totalPrice']); // Convert total price to a number
      }
    });
  }

  // Method to cancel the order and go back to the cart page
  cancelOrder() {
    this.router.navigate(['tabs/cart']); // Navigate back to the CartPage
  }

  // Method to handle form submission and checkout process
  onSubmit() {
    if (this.name && this.contactNumber && this.address && this.paymentOption) {
      // Call the saveCheckoutItems method from CheckoutService to save the order
      this.checkoutService.saveCheckoutItems(this.checkoutItems, this.totalPrice);
    
      // Optionally, navigate to an order confirmation page or a thank you page
      this.router.navigate(['tabs/profile']); // Navigate to the profile page
    } else {
      // Show an error if the form is incomplete (optional)
      alert('Please fill in all required fields!');
    }
  }
}
