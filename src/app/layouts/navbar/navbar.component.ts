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
  isDarkMode: WritableSignal<boolean> = signal(false);
  theme = localStorage['theme']
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
    this.changeTheme(this.theme)
  }

  logout() {
    this.auth.logout();
  }

  onSearch() {
    this.products.setSearchTerm(this.searchTerm())
  }
  changeTheme(theme: string): void {
    document.documentElement.classList.remove("light", "dark");

    switch (theme) {
      case 'dark':
        document.documentElement.classList.add('dark');
        localStorage['theme'] = "dark";
        this.isDarkMode.set(true);

        break;
      case 'light':
        document.documentElement.classList.add('light');
        localStorage['theme'] = "light";
        this.isDarkMode.set(false);

        break;
      default:
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const defaultTheme = systemPrefersDark ? "dark" : "light";

        document.documentElement.classList.add(defaultTheme);
        this.isDarkMode.set(systemPrefersDark);
        delete localStorage['theme'];
        break;
    }
  }
}
