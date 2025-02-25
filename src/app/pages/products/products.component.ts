import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../core/interfaces/iproduct';
import { ProductsService } from '../../core/services/products.service';
import { CurrencyPipe } from '@angular/common';
@Component({
  selector: 'app-products',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  productsList: IProduct[] = [];

  constructor(
    private products: ProductsService,
    private activatedRoute: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.displayProducts();

  }

  displayProducts() {
    this.products.getProducts().subscribe({
      next: (res) => {
        this.productsList = res.data;
        console.log(this.productsList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


}
