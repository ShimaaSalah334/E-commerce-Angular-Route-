import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, CurrencyPipe],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {
  ordersData: ICart = {} as ICart
  cartId: string = ''
  checkoutForm!: FormGroup
  isLoading: boolean = false;

  constructor(private orders: OrdersService, private cart: CartService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((p) => {
      this.cartId = p.get('id') as string
    })
    console.log(this.cartId);
    this.displayOrder()
    this.checkoutForm = new FormGroup({
      details: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),


    })
  }
  displayOrder() {
    this.cart.getCart().subscribe({
      next: (res) => {
        this.ordersData = res.data
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }
    })
  }
  submitOnline() {
    this.orders.onlinePayment(this.cartId, this.checkoutForm.value).subscribe({
      next: (res) => {
        console.log(res);

      }
      , error: (err) => {
        console.log(err);

      }
    })
  }
}
