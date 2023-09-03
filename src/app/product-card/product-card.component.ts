import { Component, Input } from '@angular/core';
import { Card } from '../interfaces/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  constructor(private router: Router) {}
  @Input() myCard!: Card;

  starsArray(rating: number): any[] {
    const roundedRating = Math.round(rating);
    return new Array(roundedRating);
  }

  redirectToDetails(id: number) {
    this.router.navigate(['product-details', id]);
  }
}
