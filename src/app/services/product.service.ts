import { Injectable } from '@angular/core';
import { Product } from '../model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts() {
    return this.products;
  }

  getProductsByCategory(category: string) {
    if (category === 'all products') {
      return this.products;
    }
    return this.products.filter((product) => product.category === category);
  }

  getProductsByIds(productIds: number[]) {
    return this.products.filter((product) => productIds.includes(product.id));
  }

  // fix this helper func
  getProductById(id: number) {
    for (var product of this.products) {
      if (product.id == id) {
        return product;
      }
    }
    console.log('cant find product');
  }

  getProductByName(name: string) {
    return this.products.filter((product) => product.name === name)[0];
  }

  private products: Product[] = [
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      id: 1,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Plushy Chair',
      price: 20.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      id: 2,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Plushy Chair',
      price: 20.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      id: 3,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Heart Chair',
      price: 20.99,
      img: 'assets/images/pinkHeartChair.png',
      category: 'chairs',
      id: 4,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Heart Chair',
      price: 20.99,
      img: 'assets/images/pinkHeartChair.png',
      category: 'chairs',
      id: 5,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'LAMPS',
      price: 20.99,
      img: 'assets/images/lamps.png',
      category: 'lamps',
      id: 6,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      id: 7,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      id: 8,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Plushy Chair',
      price: 20.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      id: 9,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'LAMPS',
      price: 20.99,
      img: 'assets/images/lamps.png',
      category: 'lamps',
      id: 10,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      id: 11,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
  ];
}
