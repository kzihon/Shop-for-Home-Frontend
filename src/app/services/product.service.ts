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
  }
  productsSignal: WritableSignal<Product[]> = signal(new Array<Product>());
  loadingProducts: boolean = true;

  loadProducts() {
    this.getAllProducts().subscribe((products: Product[]) => {
      products.forEach((el: Product) => {
        this.productsSignal().push(el);
      });
    });
  }

  getProductsByCategory(category: CategoryType): Product[] {
    let products1 = [];
    this.getProductsByCategoryDB(category.toString()).subscribe(
      (products: Product[]) => {
        products.forEach((el: Product) => {
          products1.push(el);
        });
      }
    );
    return products1;
  }

  getProductsByIds(productIds: number[]) {
    return this.productsSignal().filter((product) =>
      productIds.includes(product.productId)
    );
  }

  getProductById(id: number) {
    let product1 = null;
    this.getProductByIdDB(id).subscribe((product: Product) => {
      console.log('check here', product);

      product1 = product;
    });
    console.log('check here2', product1);
    return product1;
  }

  getProductByName(name: string) {
    return this.productsSignal().filter((product) => product.name === name)[0];
  }

  createProductFrontend(product) {
    console.log('creating product frontend: ', product);
    this.productsSignal().push(product);
  }

  // calls to database
  public createProduct(
    name: string,
    price: number,
    description: string,
    category: CategoryType,
    numberInStock: number,
    supplierName: string,
    imageFile: File
  ): Observable<any> {
    return this.authorizedHttpService.post('/product/create', {
      name,
      price,
      description,
      category,
      numberInStock,
      supplierName,
      imageFile,
    });
  }

  editProductFrontend(oldProduct: Product, product) {
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
    console.log('deleting product frontend');
    let index = this.productsSignal().indexOf(product);
    if (index > -1) {
      this.productsSignal().splice(index, 1);
    }
  }
  deleteProduct(id: number): Observable<ArrayBuffer> {
    return this.authorizedHttpService.delete(`/product/${id}`);
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${env.SERVER_URI}/product`);
  }

  public getProductsByCategoryDB(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${env.SERVER_URI}/product/byCategory?category=${category}`
    );
  }
  // public getProductByIdDB(productId: number): Observable<Product> {
  //   return this.http.get<Product>(`${env.SERVER_URI}/product/${productId}`);
  // }
  public getProductByIdDB(productId: number) {
    return this.authorizedHttpService.get(`/product/${productId}`);
  }

  private handleError({ error }: HttpErrorResponse) {
    console.log({ error });
    return throwError(() => error.message);
  }

  public addProduct(product: FormData) {
    return this.authorizedHttpService.post('/product/create', product);
  }
}
