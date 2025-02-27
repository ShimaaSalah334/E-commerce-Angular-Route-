import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  cartData: ICart = {} as ICart
  constructor(private cart: CartService) { }
  ngOnInit(): void {
    this.displayCart();
  }

  displayCart() {
    this.cart.getCart().subscribe({
      next: (res) => {
        this.cartData = res.data
        console.log(this.cartData);

      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
