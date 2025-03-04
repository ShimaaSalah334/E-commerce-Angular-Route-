import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  baseUrl: string = environment.baseUrl;
  wishListItems: WritableSignal<string[]> = signal([])
  productId: WritableSignal<string[]> = signal([])
  wishListData: WritableSignal<IProduct[]> = signal([])
  constructor(private httpClient: HttpClient, private toastr: ToastrService) { }

  getWishList(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/api/v1/wishlist`)
  }
  addToWishList(id: string): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/api/v1/wishlist`, {
      "productId": id
    },
    )
  }
  removeWishListItem(productId: string): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/api/v1/wishlist/${productId}`)
  }

  fetchWishList() {
    this.getWishList().subscribe({
      next: (res) => {
        console.log(res);
        this.wishListData.set(res.data)
        this.productId.set(res.data.map((product: IProduct) => product._id))
        this.wishListItems.set(this.productId());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
  toggleWishlistItem(id: string) {
    if (this.isInWishlist(id)) {
      this.removeWishListItem(id).subscribe({
        next: (res) => {
          this.wishListData.update(data => data.filter(product => product._id !== id))

          this.wishListItems.update(items => items.filter(itemId => itemId !== id));
          this.showSuccess(res.message);

          console.log(res);
        }, error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.addToWishList(id).subscribe({
        next: (res) => {
          console.log(res);
          this.wishListData.set(res.data)
          this.wishListItems.set(res.data)
          this.showSuccess(res.message);

        },
        error: (err) => {
          console.log(err);
        },
      })
    }
  }

  isInWishlist(productId: string): boolean {
    return this.wishListItems().includes(productId);
  }
  showSuccess(message: string) {
    this.toastr.success(message, 'Shopify');
  }
}
