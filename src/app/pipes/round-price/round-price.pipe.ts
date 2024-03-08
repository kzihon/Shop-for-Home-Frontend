import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'roundPrice',
  standalone: true
})
export class RoundPricePipe implements PipeTransform {
  transform (value: number): string {
    return `$${value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
  }
}
