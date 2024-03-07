import { Component, Input } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { ProductService } from '../../services/product.service'
import { Product } from '../../model'
import { CartService } from '../../services/cart.service'

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss'
})
export class ProductPageComponent {
  productName = ''
  product: Product
  quantity: number = 1
  productQuantity: number

  constructor (
    public route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit (): void {
    this.route.params.subscribe((params: Params) => {
      this.productName = params['productId']
      this.product = this.productService.getProductById(params['productId'])
    })
    this.productQuantity = this.product.numberInStock
  }

  addToCart () {
    this.cartService.addToCart(this.product.id, this.quantity)
  }

  increase () {
    if (this.quantity < this.productQuantity) {
      this.quantity++
    }
  }

  decrease () {
    if (this.quantity > 1) {
      this.quantity--
    }
  }
}
