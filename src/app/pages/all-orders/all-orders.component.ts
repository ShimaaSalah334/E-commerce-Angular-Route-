import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { IUser } from '../../core/interfaces/iuser';
import { OrdersService } from '../../core/services/orders.service';
import { AuthService } from '../../core/services/auth.service';
import { IUserOrders } from '../../core/interfaces/iuser-orders';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-all-orders',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.scss'
})
export class AllOrdersComponent implements OnInit {
  userData: IUser = {} as IUser;
  ordersList: WritableSignal<IUserOrders[]> = signal([])
  constructor(private orders: OrdersService, private auth: AuthService,) { }
  ngOnInit(): void {
    this.displayOrders()

  }
  displayOrders() {
    this.auth.decodeToken()
    this.userData = this.auth.userData
    this.orders.getUserOrders(this.userData.id).subscribe({
      next: (res) => {
        this.ordersList.set(res)
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
