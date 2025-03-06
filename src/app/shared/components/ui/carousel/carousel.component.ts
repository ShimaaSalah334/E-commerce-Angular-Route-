import { Component, computed } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { MyTranslateService } from '../../../../core/services/my-translate.service';

@Component({
  selector: 'app-carousel',
  imports: [CarouselModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  constructor(private translateService: MyTranslateService
  ) { }
  customOptions = computed<OwlOptions>(() => {
    const isRTL = this.translateService.currentLang() === 'ar';
    return {
      loop: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      autoplay: true,

      dots: true,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1,
        },
        400: {
          items: 1,
        },
        740: {
          items: 1,
        },
        940: {
          items: 1,
        },
      },
      nav: false,
      rtl: isRTL,

    };
  })
}
