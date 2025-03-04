import { Component, computed, OnInit } from '@angular/core';
import { WishListService } from '../../core/services/wish-list.service';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../core/services/products.service';
import { SearchPipe } from '../../shared/pipes/search.pipe';

@Component({
  selector: 'app-wish-list',
  imports: [RouterLink, CurrencyPipe, SearchPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss'
})
export class WishListComponent implements OnInit {
  wishListData = computed(() => this.wishList.wishListData())
  searchTerm = computed(() => this.products.searchTerm())

  constructor(private wishList: WishListService, private cart: CartService, private products: ProductsService, private toastr: ToastrService) { }
  ngOnInit(): void {
    this.wishList.fetchWishList()
  }

  toggleWishlistItem(productId: string) {
    this.wishList.toggleWishlistItem(productId);
  }
  isInWishlist(productId: string): boolean {
    return this.wishList.isInWishlist(productId);
  }
  addToCart(id: string) {
    this.cart.addToCart(id).subscribe({
      next: (res) => {
        console.log(res);
        this.showSuccess(res.message);
        this.cart.cartItems.set(res.numOfCartItems)
      },
      error: (err) => {
        console.log(err);

      },
    })
  }
  showSuccess(message: string) {
    this.toastr.success(message, 'Shopify');
  }
}
