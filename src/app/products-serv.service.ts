import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsServService {
  private counter = new BehaviorSubject(0);
  private cart: Array<any> = [];

  constructor() {}

  getCounterValue() {
    return this.counter.asObservable();
  }
  setCounterValue(newValue: number) {
    return this.counter.next(newValue);
  }

  getProductsInCart() {
    return this.cart;
  }
  addToCart(newProduct: any) {
    this.cart.push(newProduct);
  }
}
