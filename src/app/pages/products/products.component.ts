import { Component, computed, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { WishListService } from '../../core/services/wish-list.service';
@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productsList: WritableSignal<IProduct[]> = signal([]);
  searchTerm = computed(() => this.products.searchTerm())

  constructor(
    private products: ProductsService,
    private cart: CartService,
    private toastr: ToastrService,
    private wishList: WishListService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.displayProducts();
    this.wishList.fetchWishList()


  }

  displayProducts() {
    this.products.getProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
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
  toggleWishlistItem(productId: string) {
    this.wishList.toggleWishlistItem(productId);
  }
  isInWishlist(productId: string): boolean {
    return this.wishList.isInWishlist(productId);
  }
}
