import { Pipe, PipeTransform } from '@angular/core';
import { ProductsList } from '../interfaces/products';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(products: ProductsList[], searchValue: string): ProductsList[] {
    return products.filter((product) => {
      return product.title.toUpperCase().includes(searchValue.toUpperCase())
    });
  }

}
