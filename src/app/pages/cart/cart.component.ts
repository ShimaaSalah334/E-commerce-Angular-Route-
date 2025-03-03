import { Component, computed, OnInit, signal, WritableSignal } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartData: ICart = {} as ICart
  cartId: WritableSignal<string> = signal('');
  numberOfCartItems = computed(() => this.cart.cartItems())
  constructor(private cart: CartService) { }
  ngOnInit(): void {
    this.displayCart();
  }

  displayCart() {
    this.cart.getCart().subscribe({
      next: (res) => {
        this.cartData = res.data
        this.cartId.set(res.cartId)
        this.cart.cartItems.set(res.numOfCartItems)

        console.log(res);

      }, error: (err) => {
        console.log(err);

      }
    })
  }
  removeItem(id: string) {
    this.cart.removeCartItem(id).subscribe({
      next: (res) => {
        this.cartData = res.data
        this.cart.cartItems.set(res.numOfCartItems)

        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  updateQuantity(id: string, count: number) {
    this.cart.udateProductQuantity(id, count).subscribe({
      next: (res) => {
        this.cartData = res.data
        this.cart.cartItems.set(res.numOfCartItems)

        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  clearCart() {
    this.cart.clearCart().subscribe({
      next: (res) => {
        this.cartData = {} as ICart
        this.cart.cartItems.set(0)

        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    })
  }
  generateStars(rating: number | null | undefined): string[] {
    // Default to 0 if rating is null or undefined
    rating = rating || 0;

    const fullStars = Math.floor(rating); // Number of full stars
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Check if there's a half star
    const emptyStars = 5 - fullStars - halfStar; // Remaining empty stars

    const stars = [];

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push('fa-solid fa-star text-primary-500');
    }

    // Add half star if applicable
    if (halfStar) {
      stars.push('fa-solid fa-star-half-alt text-primary-500');
    }

    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
      stars.push('fa-regular fa-star text-primary-500');
    }

    return stars;
  }
}
