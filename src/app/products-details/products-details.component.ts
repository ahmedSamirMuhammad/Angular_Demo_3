import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../interfaces/card';
import { ProductsServService } from '../products-serv.service';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-products-details',
  templateUrl: './products-details.component.html',
  styleUrls: ['./products-details.component.css'],
})
export class ProductsDetailsComponent {
  constructor(
    private activatedRoute: ActivatedRoute,
    private cardService: CardsService,
    private productService: ProductsServService
  ) {}
  counter: number = 0;
  selectedCard_id: number = 0;
  selectedCard: any;

  starsArray(rating: number): any[] {
    const roundedRating = Math.round(rating);
    return new Array(roundedRating);
  }

  ngOnInit() {
    this.selectedCard_id = this.activatedRoute.snapshot.params['id'];
    this.cardService
      .getProductsDetails(this.selectedCard_id)
      .subscribe((data) => (this.selectedCard = data));
    this.productService
      .getCounterValue()
      .subscribe((val) => (this.counter = val));
  }
}
