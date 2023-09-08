import { Component, Input } from '@angular/core';
import { Card } from '../interfaces/card';
import { Router } from '@angular/router';
import { ProductsServService } from '../products-serv.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  constructor(
    private router: Router,
    private counterService: ProductsServService,
    private cart: ProductsServService
  ) {}
  @Input() myCard!: any;
  counter: number = 0;

  starsArray(rating: number): any[] {
    const roundedRating = Math.round(rating);
    return new Array(roundedRating);
  }

  redirectToDetails(id: number) {
    this.router.navigate(['product-details', id]);
  }

  ngOnInit() {
    this.counterService
      .getCounterValue()
      .subscribe((val) => (this.counter = val));
  }

  addToCart(product: any) {
    const existingItemIndex = this.cart
      .getProductsInCart()
      .findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If the product already exists in the cart, increment its quantity.
      this.cart.getProductsInCart()[existingItemIndex].quantity++;
    } else {
      // If the product is not in the cart, add it with a quantity of 1.
      this.cart.addToCart({ ...product, quantity: 1 });
    }

    this.cart.setCounterValue(++this.counter);
  }
}
