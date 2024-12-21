import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface Order {
  items: CartItem[];
  date: Date;
  canceled?: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemCount = new BehaviorSubject<number>(0);
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  private orders: Order[] = [];
  private processedOrders: Order[] = [];

  // Get Cart Items
  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  // Get the total price of items in the cart
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // Method to add items to the cart
  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.updateCart();
  }

  // Checkout method (moving cart items to orders and clearing the cart)
  checkout() {
    if (this.cartItems.length > 0) {
      const newOrder: Order = { items: [...this.cartItems], date: new Date() };
      this.orders.push(newOrder); // Add order to orders array
      this.clearCart(); // Clear cart after checkout
    }
  }

  // Clear the cart
  clearCart() {
    this.cartItems = [];
    this.updateCart();
  }

  private updateCart() {
    this.cartItemCount.next(this.getTotalItems());
    this.cartItemsSubject.next([...this.cartItems]);
  }

  // Get the total items in the cart
  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  updateQuantity(item: CartItem, newQuantity: number) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem && newQuantity >= 1) {
      existingItem.quantity = newQuantity;
      this.updateCart();
    }
  }removeFromCart(item: CartItem) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.updateCart();
  }
  getCartItemCount(): Observable<number> {
    return this.cartItemCount.asObservable();
  }
  getOrders(includeProcessed: boolean = false): Order[] {
    return includeProcessed ? [...this.orders, ...this.processedOrders] : [...this.orders];
  }
      
}
