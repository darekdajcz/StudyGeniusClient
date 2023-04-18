import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyPipe',
  pure: false
})
export class CurrencyPipe implements PipeTransform {
  transform(value: number): string {
    return `${value}.00 zł`;
  }
}
