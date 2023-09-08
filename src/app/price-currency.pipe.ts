import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceCurrency'
})
export class PriceCurrencyPipe implements PipeTransform {

  transform(value: number): string {
    return `${value} EGP`;
  }

}
