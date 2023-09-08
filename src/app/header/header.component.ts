import { Component } from '@angular/core';
import { ProductsServService } from '../products-serv.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  counter: number = 0;

  constructor(private counterService: ProductsServService) {}

  ngOnInit() {
    this.counterService
      .getCounterValue()
      .subscribe((val) => (this.counter = val));
  }
}
