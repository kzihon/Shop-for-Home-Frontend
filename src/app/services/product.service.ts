import { Injectable } from '@angular/core';
import { Product } from '../model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts() {
    return this.products;
  }

  getProductsByCategory (category: string) {
    if (category === "all products") {
      return this.products;
    }
    return this.products.filter(
      product => product.category === category
    );
  }

  getProductsByIds (productIds: number[]) {
    return this.products.filter(
      product => productIds.includes(product.id)
    );
  }

  // fix this helper func
  getProductById (id: number) {
    console.log("looking for id: " + id)
    for (var product of this.products) {
      if (product.id == id) {
        return product;
      }
    }
    console.log("cant find product")
       
  }

    getProductByName (name: string) {
      return this.products.filter(
        product => product.name === name
      )[0];  }

  private products:Product[] = [
    { name: "TABLES",
      price: 20.99,
      img: "assets/images/tables.png",
      category: 'tables',
      id: 1
    },
    { name: "Pink Plushy Chair",
      price: 20.99,
      img: "assets/images/chairs.png",
      category: 'chairs',
      id: 2
    },
    { name: "Pink Plushy Chair",
    price: 20.99,
    img: "assets/images/chairs.png",
    category: 'chairs',
    id: 3
    },
    { name: "Pink Heart Chair",
    price: 20.99,
    img: "assets/images/pinkHeartChair.png",
    category: 'chairs',
    id: 4
  },
    { name: "Pink Heart Chair",
    price: 20.99,
    img: "assets/images/pinkHeartChair.png",
    category: 'chairs',
    id: 5
    },
    { name: "LAMPS",
      price: 20.99,
      img: "assets/images/lamps.png",
      category: 'lamps',
      id: 6
    },
    { name: "TABLES",
      price: 20.99,
      img: "assets/images/tables.png",
      category: 'tables',
      id: 7
    },
    { name: "TABLES",
      price: 20.99,
      img: "assets/images/tables.png",
      category: 'tables',
      id: 8
    },
    { name: "Pink Plushy Chair",
      price: 20.99,
      img: "assets/images/chairs.png",
      category: 'chairs',
      id: 9
    },
    { name: "LAMPS",
      price: 20.99,
      img: "assets/images/lamps.png",
      category: 'lamps',
      id: 10
    },
    { name: "TABLES",
      price: 20.99,
      img: "assets/images/tables.png",
      category: 'tables',
      id: 11
    },
  ]


}
