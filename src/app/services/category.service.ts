import { Injectable } from '@angular/core';
import { Category } from '../model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: Category[] = [
    { name: 'ALL PRODUCTS', img: 'assets/images/allCategories.png' },
    { name: 'TABLES', img: 'assets/images/tables.png' },
    { name: 'CHAIRS', img: 'assets/images/chairs.png' },
    { name: 'LAMPS', img: 'assets/images/lamps.png' },
    { name: 'PLANTS', img: 'assets/images/plants.png' },
    { name: 'DECOR', img: 'assets/images/art.png' },
    { name: 'COUCHES', img: 'assets/images/couches.png' },
    { name: 'RUGS', img: 'assets/images/rugs.png' },
  ];

  getCategories() {
    return this.categories;
  }
}
