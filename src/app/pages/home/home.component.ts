import { Component, computed, ElementRef, OnInit, QueryList, signal, ViewChild, ViewChildren, viewChildren, WritableSignal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProduct } from '../../core/interfaces/iproduct';
import { ICategory } from '../../core/interfaces/icategory';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { WishListService } from '../../core/services/wish-list.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [CarouselModule, RouterLink, CurrencyPipe, SearchPipe, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  productsList: WritableSignal<IProduct[]> = signal([]);
  categoriesList: WritableSignal<ICategory[]> = signal([]);
  searchTerm = computed(() => this.products.searchTerm())

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoWidth: false,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-angle-left owel-nav-icon" ></i>',
      '<i class="fa-solid fa-angle-right owel-nav-icon"></i>',
    ],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 4,
      },
      740: {
        items: 5,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
  };
  constructor(
    private products: ProductsService,
    private categories: CategoriesService,
    private cart: CartService,
    private wishList: WishListService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.displayProducts();
    this.displayCategories();
    this.wishList.fetchWishList()

  }

  displayProducts() {
    this.products.getProducts().subscribe({
      next: (res) => {
        this.productsList.set(res.data);
        console.log(this.productsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  displayCategories() {
    this.categories.getCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data);
        console.log(this.categoriesList);
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


  toggleWishlistItem(productId: string) {
    this.wishList.toggleWishlistItem(productId);
  }
  isInWishlist(productId: string): boolean {
    return this.wishList.isInWishlist(productId);
  }
  showSuccess(message: string) {
    this.toastr.success(message, 'Shopify');
  }
}
