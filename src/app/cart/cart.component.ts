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
      existingItem.quantity++;
    } else {
      product.quantity = 1;
      this.cart.push({ ...product });
    }

    this.calculateTotalPrice();
    this.incrementCounter();
  }

  removeFromCart(product: any) {
    const existingItemIndex = this.cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      if (this.cart[existingItemIndex].quantity > 1) {
        this.cart[existingItemIndex].quantity--;
      } else {
        this.cart.splice(existingItemIndex, 1);
      }

      this.productService.setCounterValue(--this.counter);
      this.calculateTotalPrice();
    }
  }

  clearFromCart(product: any) {
    const existingItemIndex = this.cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const removedItemQuantity = this.cart[existingItemIndex].quantity;

      this.cart.splice(existingItemIndex, 1);

      this.counter -= removedItemQuantity;

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
