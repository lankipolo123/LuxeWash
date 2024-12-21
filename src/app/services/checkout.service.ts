import { Injectable } from '@angular/core';
import { CartItem } from './cart.service';  // Import CartItem interface

export interface Order {
  items: { name: string, price: number, quantity: number, imageUrl: string }[]; // Array of items in the order
  totalPrice: number;  // Total price of the order
  date: Date;  // Date of the order
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private checkoutOrders: Order[] = [];  // Array to store orders (not just individual items)

  constructor() {}

  // Save checkout items as an order
  saveCheckoutItems(items: CartItem[], totalPrice: number): void {
    const order: Order = {
      items: items.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,  // Assuming CartItem has imageUrl
      })),
      totalPrice: totalPrice,
      date: new Date(),  // Set the current date as the order date
    };
    this.checkoutOrders.push(order);  // Save the order in the array
  }

  // Get saved orders
  getCheckoutItems(): Order[] {
    return this.checkoutOrders;  // Return the list of orders
  }

  // Clear saved orders
  clearCheckoutItems(): void {
    this.checkoutOrders = [];  // Clear all saved orders
  }
}
