import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild, Renderer2, WritableSignal, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { OrdersService } from '../../core/services/orders.service';
import { ICash } from '../../core/interfaces/icash';
import { AuthService } from '../../core/services/auth.service';
import { IUser } from '../../core/interfaces/iuser';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.scss'
})
export class CheckOutComponent implements OnInit {
  ordersData: ICart = {} as ICart
  cashData: ICash = {} as ICash
  cartId: string = "";
  checkoutForm!: FormGroup
  userData: IUser = {} as IUser
  @ViewChild('modal') modal!: ElementRef
  constructor(private orders: OrdersService, private cart: CartService, private auth: AuthService, private activatedRoute: ActivatedRoute, private renderer2: Renderer2) { }
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

      }, error: (err) => {
        console.log(err);

      }
    })
  }
  submitOnline() {
    if (this.checkoutForm.valid) {
      this.orders.onlinePayment(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          window.open(res.session.url, "_self")
          this.cart.cartItems.set(0)

        }
        , error: (err) => {
          console.log(err);


        }
      })
    } else {
      this.checkoutForm.markAllAsTouched()
    }

  }
  submitCash() {

    if (this.checkoutForm.valid) {
      this.orders.cashPayment(this.cartId, this.checkoutForm.value).subscribe({
        next: (res) => {
          this.cashData = res.data
          this.cart.cartItems.set(0)
          this.auth.decodeToken();
          this.userData = this.auth.userData
          console.log(this.auth.userData);

          this.renderer2.removeClass(this.modal.nativeElement, "hidden")
          this.renderer2.addClass(this.modal.nativeElement, "flex")
          this.renderer2.addClass(document.body, "overflow-y-hidden");



        }
        , error: (err) => {
          console.log(err);


        }
      })
    } else {
      this.checkoutForm.markAllAsTouched()
    }

  }
  showOverFlow() {

    this.renderer2.removeClass(document.body, "overflow-y-hidden");
  }
}
