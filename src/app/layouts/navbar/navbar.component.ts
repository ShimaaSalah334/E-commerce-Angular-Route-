import { Component, computed, input, Input, InputSignal, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: InputSignal<boolean> = input(true)
  numberOfCartItems = computed(() => this.cart.cartItems())
  constructor(private auth: AuthService, private cart: CartService) { }
  ngOnInit(): void {

    this.cart.getCart().subscribe({
      next: (res) => {
        this.cart.cartItems.set(res.numOfCartItems)
        console.log(res);
      }, error: (err) => {
        console.log(err);
      }
    })
  }

  logout() {
    this.auth.logout();
  }

}
