import { Component, OnInit, Signal, computed } from '@angular/core';
import { Product } from '../../model';
import { ProductService } from '../../services/product.service';
import { AuthLocalStorageService } from '../../services/auth-local-storage/auth-local-storage.service';
import { WishlistService } from '../../services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist-page',
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent implements OnInit {
  public wishlist: Product[] = [];
  wishlistSignal: Signal<Product[]> = computed(() =>
    this.wishlistService.wishlistSignal()
  );

  constructor(private wishlistService: WishlistService) {}

  ngOnInit(): void {}
}
