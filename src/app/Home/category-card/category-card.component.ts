import { Component, Input } from '@angular/core';
import { Category, Product } from '../../model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.scss'
})
export class CategoryCardComponent {
  @Input() category: Category;

}
