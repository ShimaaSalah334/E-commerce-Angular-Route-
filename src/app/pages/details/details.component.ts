import { ProductsService } from './../../core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe } from '@angular/common';
import { log } from 'console';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @ViewChild('coverImage') coverImage!: ElementRef;
  id: string = '';
  productData: IProduct = {} as IProduct;
  constructor(private activatedRoute: ActivatedRoute, private products: ProductsService, private render2: Renderer2) { }
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 0,
    navSpeed: 700,
    navText: ['<i class="fa-solid fa-angle-left text-gray-650" ></i>',
      '<i class="fa-solid fa-angle-right text-gray-650"></i>',],
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 3,
      },
      740: {
        items: 4,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        this.id = p.get('id') as string
        console.log(this.id);
        this.displayProductDetails();
      }
    })
  }

  displayProductDetails() {
    this.products.getSpecificProduct(this.id).subscribe({
      next: (res) => {
        this.productData = res.data
        console.log(this.productData);

      }, error: (err) => {
        console.log(err);

      }
    })
  }

  getatrr(event: MouseEvent) {
    const target = event.target as HTMLImageElement;
    if (target && target.tagName === 'IMG' && this.coverImage) {
      this.render2.setAttribute(this.coverImage.nativeElement, 'src', target.src)

    }

  }

}
