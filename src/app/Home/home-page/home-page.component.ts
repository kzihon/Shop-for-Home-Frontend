import { Component } from '@angular/core'
import { AppService } from '../../app.service'
import { ActivatedRoute } from '@angular/router'
import { CategoryService } from '../../services/category.service'
import { Category } from '../../model'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  admin
  loggedIn

  categories: Category[] = []

  constructor (
    appService: AppService,
    private categoryService: CategoryService,
    private route: ActivatedRoute
  ) {
    this.loggedIn = appService.getLoggedIn()
    this.admin = appService.getAdmin()
    this.categories = categoryService.getCategories()
  }

  products = [
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables'
    },
    {
      name: 'CHAIRS',
      price: 20.99,
      img: 'assets/images/chairs.png',
      category: 'chairs'
    },
    {
      name: 'LAMPS',
      price: 20.99,
      img: 'assets/images/lamps.png',
      category: 'lamps'
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables'
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables'
    },
    {
      name: 'CHAIRS',
      price: 20.99,
      img: 'assets/images/chairs.png',
      category: 'chairs'
    },
    {
      name: 'LAMPS',
      price: 20.99,
      img: 'assets/images/lamps.png',
      category: 'lamps'
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables'
    }
  ]
}
