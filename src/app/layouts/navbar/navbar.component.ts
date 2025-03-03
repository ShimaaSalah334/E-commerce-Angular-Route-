import { ProductsService } from './../../core/services/products.service';
import { Component, computed, input, Input, InputSignal, OnInit, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: InputSignal<boolean> = input(true)
  searchTerm: WritableSignal<string> = signal("")
  numberOfCartItems = computed(() => this.cart.cartItems())
  constructor(private auth: AuthService, private cart: CartService, private products: ProductsService) { }
  ngOnInit(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      this.cart.getCart().subscribe({
        next: (res) => {
          this.cart.cartItems.set(res.numOfCartItems)
          console.log(res);
        }, error: (err) => {
          console.log(err);
        }
      })
    } else {
      console.log('User is not logged in. Skipping cart fetch.');
    }
  }

  logout() {
    this.auth.logout();
  }

  onSearch() {
    this.products.setSearchTerm(this.searchTerm())
  }
}
