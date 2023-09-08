import { Component } from '@angular/core';
import { ProductsServService } from '../products-serv.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  counter: number = 0;
  cart: Array<any> = [];
  totalPrice: number = 0;

  constructor(private productService: ProductsServService) {}

  ngOnInit() {
    this.productService
      .getCounterValue()
      .subscribe((val) => (this.counter = val));
    this.cart = this.productService.getProductsInCart();
    this.calculateTotalPrice();
  }

  incrementCounter() {
    this.counter++;
    this.productService.setCounterValue(this.counter);
  }

  addToCart(product: any) {
    const existingItem = this.cart.find((item) => item.id === product.id);

    if (existingItem) {
      // If the product already exists in the cart, increment its quantity.
      existingItem.quantity++;
    } else {
      // If the product is not in the cart, add it with a quantity of 1.
      product.quantity = 1; // Initialize the quantity property
      this.cart.push({ ...product });
    }

    // Update the counter and recalculate the total price
    this.calculateTotalPrice();
    this.incrementCounter();
  }

  removeFromCart(product: any) {
    const existingItemIndex = this.cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // If the product exists in the cart and its quantity is greater than 1, decrement its quantity.
      if (this.cart[existingItemIndex].quantity > 1) {
        this.cart[existingItemIndex].quantity--;
      } else {
        // If the quantity is 1 or less, remove the item from the cart.
        this.cart.splice(existingItemIndex, 1);
      }

      // Decrement the counter when removing from the cart.
      this.productService.setCounterValue(--this.counter);
      this.calculateTotalPrice();
    }
  }

  clearFromCart(product: any) {
    const existingItemIndex = this.cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      // Get the quantity of the item being removed
      const removedItemQuantity = this.cart[existingItemIndex].quantity;

      // Remove the item from the cart
      this.cart.splice(existingItemIndex, 1);

      // Decrease the counter by the quantity of items removed
      this.counter -= removedItemQuantity;

      // Update the counter using the productService
      this.productService.setCounterValue(this.counter);
      this.calculateTotalPrice();
    }
  }
  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  }
}
