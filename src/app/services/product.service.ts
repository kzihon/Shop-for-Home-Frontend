import { Injectable, WritableSignal, signal } from '@angular/core';
import { Product } from '../model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { env } from '../env';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient // private localStorageService: LocalStorageService
  ) {
    this.loadProducts();
  }
  productsSignal: WritableSignal<Product[]> = signal([]);

  loadProducts() {
    this.getAllProducts().subscribe((products: Product[]) => {
      products.forEach((el: Product) => {
        // el.processedImage = 'data:image/jpeg;base64,' + el.image
        // this.products.push(el)
        this.productsSignal().push(el);
      });
    });
    // for (let dummyProd of this.products) {
    //   this.productsSignal().push(dummyProd);
    // }
  }

  getProducts() {
    this.getAllProducts().subscribe((products: Product[]) => {
      products.forEach((el: Product) => {
        // el.processedImage = 'data:image/jpeg;base64,' + el.image
        // this.products.push(el)
        this.products.push(el);
      });
    });
    return this.products;
  }

  getProductsByCategory(category: string) {
    if (category === 'all products') {
      return this.products;
    }
    return this.products.filter((product) => product.category === category);
  }

  getProductsByIds(productIds: number[]) {
    return this.products.filter((product) =>
      productIds.includes(product.productId)
    );
  }

  // fix this helper func
  getProductById(id: number) {
    for (var product of this.products) {
      if (product.productId == id) {
        return product;
      }
    }
    console.log('cant find product');
  }

  getProductByName(name: string) {
    return this.products.filter((product) => product.name === name)[0];
  }

  createProduct1(name: string) {
    console.log('creating product: ', name);
    // make call to backend
  }

  // calls to database
  public createProduct(
    name: string,
    price: number,
    description: string,
    category: string,
    numberInStock: number,
    supplierName: string
  ): Observable<any> {
    return this.http.post(
      env.SERVER_URI + '/product/create',
      { name, price, description, category, numberInStock, supplierName }
      // { headers: 'response' }
    );
  }

  public editProduct(
    id: number,
    name: string,
    price: number,
    description: string,
    category: string,
    numberInStock: number,
    supplierName: string
  ): Observable<any> {
    console.log(id);
    return this.http.put(
      `${env.SERVER_URI}/product/update/${id}`,
      { name, price, description, category, numberInStock, supplierName }
      // { headers: 'response' }
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(
      `${env.SERVER_URI}/product/delete/${id}`
      // , {headers: this.adminService.authorizeHeader}
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${env.SERVER_URI}/product/get`);
  }

  // updateProduct (id: number, formData: FormData): Observable<any> {
  //   return this.http.put(`${env.SERVER_URI}/product/${id}`, formData, {
  //     headers: this.adminService.authorizeHeader
  //   })
  // }

  // public deleteProduct(id: number): Observable<any> {
  //   return this.http
  //     .delete(env.SERVER_URI + '/product/delete/{id}', { observe: 'response' })
  //     .pipe(
  //       map((response) => {
  //         console.log(response);
  //         const productDetails = (response.body as any).name;

  //         return productDetails;
  //       }),
  //       catchError(this.handleError)
  //     );
  // }
  private handleError({ error }: HttpErrorResponse) {
    console.log({ error });
    return throwError(() => error.message);
  }

  private products: Product[] = [
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      productId: 111,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Plushy Chair',
      price: 25.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      productId: 112,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Plushy Chair',
      price: 22.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      productId: 113,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Heart Chair',
      price: 10.99,
      img: 'assets/images/pinkHeartChair.png',
      category: 'chairs',
      productId: 114,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Heart Chair',
      price: 30.99,
      img: 'assets/images/pinkHeartChair.png',
      category: 'chairs',
      productId: 115,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'LAMPS',
      price: 20.99,
      img: 'assets/images/lamps.png',
      category: 'lamps',
      productId: 116,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      productId: 117,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      productId: 118,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'Pink Plushy Chair',
      price: 30.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      productId: 119,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'LAMPS',
      price: 20.99,
      img: 'assets/images/lamps.png',
      category: 'lamps',
      productId: 110,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      productId: 111,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1',
    },
  ];
}
