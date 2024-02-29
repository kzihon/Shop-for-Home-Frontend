import { Component } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.categories = categoryService.getCategories();
  }
}
