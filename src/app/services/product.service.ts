import { Injectable } from '@angular/core'
import { Product } from '../model'
import { Observable, catchError, map, throwError } from 'rxjs'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { env } from '../env'
import { AuthLocalStorageService } from './auth-local-storage/auth-local-storage.service'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor (
    private http: HttpClient // private localStorageService: LocalStorageService
  ) {}

  getProducts () {
    return this.products
  }

  getProductsByCategory (category: string) {
    if (category === 'all products') {
      return this.products
    }
    return this.products.filter(product => product.category === category)
  }

  getProductsByIds (productIds: number[]) {
    // return this.products.filter((product) => productIds.includes(product.id));
  }

  // fix this helper func
  getProductById (id: number) {
    for (var product of this.products) {
      if (product.id == id) {
        return product
      }
    }
    console.log('cant find product')
  }

  getProductByName (name: string) {
    return this.products.filter(product => product.name === name)[0]
  }

  createProduct1 (name: string) {
    console.log('creating product: ', name)
    // make call to backend
  }

  public createProduct (
    name: string,
    price: number,
    description: string,
    category: string,
    numberInStock: number,
    supplierName: string
  ): Observable<any> {
    // public createProduct (name: string): Observable<any> {

    return this.http
      .post(
        env.SERVER_URI + '/product/create',
        { name, price, description, category, numberInStock, supplierName },
        { observe: 'response' }
      )
      .pipe(
        map(response => {
          console.log(response)
          const productDetails = (response.body as any).name

          // const product = productDetails.name
          return productDetails
        }),
        catchError(this.handleError)
      )
  }

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
  private handleError ({ error }: HttpErrorResponse) {
    console.log({ error })
    return throwError(() => error.message)
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
      supplierName: 'decor supplier 1'
    },
    {
      name: 'Pink Plushy Chair',
      price: 25.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      id: 2,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'Pink Plushy Chair',
      price: 22.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      id: 3,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'Pink Heart Chair',
      price: 10.99,
      img: 'assets/images/pinkHeartChair.png',
      category: 'chairs',
      id: 4,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'Pink Heart Chair',
      price: 30.99,
      img: 'assets/images/pinkHeartChair.png',
      category: 'chairs',
      id: 5,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'LAMPS',
      price: 20.99,
      img: 'assets/images/lamps.png',
      category: 'lamps',
      id: 6,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      id: 7,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      id: 8,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'Pink Plushy Chair',
      price: 30.99,
      img: 'assets/images/chairs.png',
      category: 'chairs',
      id: 9,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'LAMPS',
      price: 20.99,
      img: 'assets/images/lamps.png',
      category: 'lamps',
      id: 10,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    },
    {
      name: 'TABLES',
      price: 20.99,
      img: 'assets/images/tables.png',
      category: 'tables',
      id: 11,
      description: 'description description description description',
      numberInStock: 10,
      supplierName: 'decor supplier 1'
    }
  ]
}
