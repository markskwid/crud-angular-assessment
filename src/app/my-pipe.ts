import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatNumber',
})
export class FormatNumber implements PipeTransform {
  transform(value: any) {
    if (!value) {
      return value;
    }

    const formattedNumber = value.replace(/(\d{4})(\d{3})(\d{4})/, '$1-$2-$3');
    return formattedNumber;
  }
}
