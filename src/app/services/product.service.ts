import { Injectable, WritableSignal, signal } from '@angular/core';
import { CategoryType, Product } from '../model';
import { Observable, catchError, map, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { env } from '../env';
import { AuthorizedHttpService } from './authorized-http/authorized-http.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private authorizedHttpService: AuthorizedHttpService
  ) {
    this.loadProducts();
    console.log('products from dummy', this.productsSignal());
  }
  productsSignal: WritableSignal<Product[]> = signal(new Array<Product>());

  loadProducts() {
    this.getAllProducts().subscribe((products: Product[]) => {
      products.forEach((el: Product) => {
        console.log('element from backend', el);
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

  getProductsByCategory(category: CategoryType) {
    if (category.toString() == 'ALL PRODUCTS') {
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

  createProductFrontend(product: Product) {
    console.log('creating product: ', product);
    this.productsSignal().push(product);
  }

  // calls to database
  public createProduct(
    name: string,
    price: number,
    description: string,
    category: CategoryType,
    numberInStock: number,
    supplierName: string
  ): Observable<any> {
    // this.productsSignal().push({
    //   name: name,
    // price: price,
    // description: description,
    // category: category,
    // numberInStock: numberInStock,
    // supplierName: supplierName
    // })
    return this.http.post(
      env.SERVER_URI + '/product/create',
      { name, price, description, category, numberInStock, supplierName }
      // {headers: this.authorizedHeader}
      // { headers: 'response' }
    );
  }

  editProductFrontend(oldProduct: Product, product: Product) {
    let index = this.productsSignal().indexOf(oldProduct);
    if (index > -1) {
      this.productsSignal()[index] = product;
    }
  }

  public editProduct(
    id: number,
    name: string,
    price: number,
    description: string,
    category: CategoryType,
    numberInStock: number,
    supplierName: string
  ): Observable<any> {
    return this.authorizedHttpService.put(
      `/product/${id}`,
      { name, price, description, category, numberInStock, supplierName }

      // { headers: 'response' }
    );
  }
  deleteProductFrontend(product: Product) {
    let index = this.productsSignal().indexOf(product);
    if (index > -1) {
      this.productsSignal().splice(index, 1);
    }
  }
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(
      `${env.SERVER_URI}/product/delete/${id}`
      // , {headers: this.adminService.authorizeHeader}
    );
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${env.SERVER_URI}/product`);
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
      imageModel: {
        id: 1,
        name: 'tables.png',
        type: 'image/png',
        filePath: 'assets/images/tables.png',
      },
      category: CategoryType.TABLE,
      productId: 111,
      description: 'description description description description',
      numberInStock: 10,
      supplier: 'decor supplier 1',
    },
    {
      name: 'Pink Plushy Chair',
      price: 25.99,
      imageModel: {
        id: 1,
        name: 'tables.png',
        type: 'image/png',
        filePath: 'assets/images/tables.png',
      },
      category: CategoryType.CHAIRS,
      productId: 112,
      description: 'description description description description',
      numberInStock: 10,
      supplier: 'decor supplier 1',
    },
    {
      name: 'Pink Plushy Chair',
      price: 22.99,
      imageModel: {
        id: 1,
        name: 'tables.png',
        type: 'image/png',
        filePath: 'assets/images/tables.png',
      },
      category: CategoryType.CHAIRS,
      productId: 113,
      description: 'description description description description',
      numberInStock: 10,
      supplier: 'decor supplier 1',
    },
    // {
    //   name: 'Pink Heart Chair',
    //   price: 10.99,
    //   img: 'assets/images/pinkHeartChair.png',
    //   category: 'chairs',
    //   productId: 114,
    //   description: 'description description description description',
    //   numberInStock: 10,
    //   supplierName: 'decor supplier 1',
    // },
    // {
    //   name: 'Pink Heart Chair',
    //   price: 30.99,
    //   img: 'assets/images/pinkHeartChair.png',
    //   category: 'chairs',
    //   productId: 115,
    //   description: 'description description description description',
    //   numberInStock: 10,
    //   supplierName: 'decor supplier 1',
    // },
    // {
    //   name: 'LAMPS',
    //   price: 20.99,
    //   img: 'assets/images/lamps.png',
    //   category: 'lamps',
    //   productId: 116,
    //   description: 'description description description description',
    //   numberInStock: 10,
    //   supplierName: 'decor supplier 1',
    // },
    // {
    //   name: 'TABLES',
    //   price: 20.99,
    //   img: 'assets/images/tables.png',
    //   category: 'tables',
    //   productId: 117,
    //   description: 'description description description description',
    //   numberInStock: 10,
    //   supplierName: 'decor supplier 1',
    // },
    // {
    //   name: 'TABLES',
    //   price: 20.99,
    //   img: 'assets/images/tables.png',
    //   category: 'tables',
    //   productId: 118,
    //   description: 'description description description description',
    //   numberInStock: 10,
    //   supplierName: 'decor supplier 1',
    // },
    // {
    //   name: 'Pink Plushy Chair',
    //   price: 30.99,
    //   img: 'assets/images/chairs.png',
    //   category: 'chairs',
    //   productId: 119,
    //   description: 'description description description description',
    //   numberInStock: 10,
    //   supplierName: 'decor supplier 1',
    // },
    // {
    //   name: 'LAMPS',
    //   price: 20.99,
    //   img: 'assets/images/lamps.png',
    //   category: 'lamps',
    //   productId: 110,
    //   description: 'description description description description',
    //   numberInStock: 10,
    //   supplierName: 'decor supplier 1',
    // },
    // {
    //   name: 'TABLES',
    //   price: 20.99,
    //   img: 'assets/images/tables.png',
    //   category: 'tables',
    //   productId: 111,
    //   description: 'description description description description',
    //   numberInStock: 10,
    //   supplierName: 'decor supplier 1',
    // },
  ];
}
