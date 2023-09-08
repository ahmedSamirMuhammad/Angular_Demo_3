import { Component } from '@angular/core';
import { Card } from '../interfaces/card';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent {
  cards: any;
  constructor(private cardsService: CardsService) {}

  ngOnInit() {
    this.cardsService.getProductsList().subscribe(
      (data: any) => (this.cards = data['products']),
      (error) => console.log(error)
    );
  }
}
