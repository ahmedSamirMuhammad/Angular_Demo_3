import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  private selectedCardSource = new BehaviorSubject<any>(null);
  constructor(private http: HttpClient) {}

  getProductsList() {
    return this.http.get('https://dummyjson.com/products', {
      headers: { 'content-type': 'JSON file' },
      params: { category: 'Technology' },
    });
  }

  getProductsDetails(id: number | string) {
    return this.http.get(`https://dummyjson.com/products/${id}`);
  }

  getSelectedCard() {
    return this.selectedCardSource.asObservable();
  }
  setSelectedCard(newVal: any) {
    this.selectedCardSource.next(newVal);
  }
}
