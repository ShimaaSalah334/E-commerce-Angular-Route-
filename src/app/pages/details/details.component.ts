import { ProductsService } from './../../core/services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, computed, ElementRef, OnInit, Renderer2, signal, ViewChild, WritableSignal } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { log } from 'console';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { MyTranslateService } from '../../core/services/my-translate.service';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, CarouselModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @ViewChild('coverImage') coverImage!: ElementRef;
  id: string = '';
  productData: IProduct = {} as IProduct;
  relatedProducts: WritableSignal<IProduct[]> = signal([]);
  allProducts: WritableSignal<IProduct[]> = signal([]);
  quantity = signal(1); // Signal to track the quantity

  constructor(private activatedRoute: ActivatedRoute, private products: ProductsService, private cart: CartService, private toastr: ToastrService, private translateService: MyTranslateService

    , private render2: Renderer2) { }
  customOptions = computed<OwlOptions>(() => {
    const isRTL = this.translateService.currentLang() === 'ar';
    return {
      loop: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      margin: 10,
      navSpeed: 700,
      navText: isRTL
        ? [
          '<i class="fa-solid fa-angle-right text-gray-450 absolute -right-5"></i>', // Right arrow for RTL
          '<i class="fa-solid fa-angle-left text-gray-450 absolute -left-5"></i>', // Left arrow for RTL
        ]
        : [
          '<i class="fa-solid fa-angle-left text-gray-450 absolute -right-5"></i>', // Left arrow for LTR
          '<i class="fa-solid fa-angle-right text-gray-450 absolute -left-5"></i>', // Right arrow for LTR
        ],
      responsive: {
        0: {
          items: 2,
        },
        400: {
          items: 3,
        },
        740: {
          items: 4,
        },
        940: {
          items: 4,
        },
      },
      nav: true,
      rtl: isRTL,

    }
  })

  customOptions2 = computed<OwlOptions>(() => {
    const isRTL = this.translateService.currentLang() === 'ar';
    return {
      loop: false,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      margin: 10,
      navSpeed: 700,
      navText: isRTL
        ? [
          '<i class="fa-solid fa-angle-right text-gray-450"></i>', // Right arrow for RTL
          '<i class="fa-solid fa-angle-left text-gray-450"></i>', // Left arrow for RTL
        ]
        : [
          '<i class="fa-solid fa-angle-left text-gray-450"></i>', // Left arrow for LTR
          '<i class="fa-solid fa-angle-right text-gray-450"></i>', // Right arrow for LTR
        ],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 4
        }
      },
      nav: true,
      rtl: isRTL,

    }
  });
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        this.id = p.get('id') as string
        console.log(this.id);
        this.displayProductDetails();
      }
    })
    this.products.getProducts().subscribe({
      next: (res) => {
        this.allProducts.set(res.data);
        console.log(res);
        this.displayProductDetails();

      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  displayProductDetails() {
    this.products.getSpecificProduct(this.id).subscribe({
      next: (res) => {
        this.productData = res.data
        console.log(this.productData);
        this.loadRelatedProducts(this.productData.category._id);

      }, error: (err) => {
        console.log(err);

      }
    })
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Shopify');
  }
  changeImg(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    if (target && target.tagName === 'IMG' && this.coverImage) {
      this.render2.setAttribute(this.coverImage.nativeElement, 'src', target.src)

    }

  }
  loadRelatedProducts(categoryId: string) {

    // Filter products by category
    const filteredProducts = this.allProducts().filter(
      (product) => product.category._id === categoryId && product._id !== this.id
    );

    this.relatedProducts.set(filteredProducts);
  }
  increaseQuantity() {
    this.quantity.update((qty) => qty + 1);
    this.updateCartQuantity(this.productData._id, this.quantity());
  }

  // Method to decrease quantity
  decreaseQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update((qty) => qty - 1);
      this.updateCartQuantity(this.productData._id, this.quantity());
    }
  }

  // Update quantity in the cart via API
  updateCartQuantity(productId: string, quantity: number) {
    this.cart.udateProductQuantity(productId, quantity).subscribe({
      next: (res) => {
        console.log(res);
        this.cart.cartItems.set(res.numOfCartItems);

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
        this.cart.cartItems.set(res.numOfCartItems);

        // Update the quantity in the cart after adding the product
        this.updateCartQuantity(id, this.quantity());
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

}
