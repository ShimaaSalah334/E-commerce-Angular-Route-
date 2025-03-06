import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { IBrand } from '../../core/interfaces/ibrand';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-brands',
  imports: [TranslatePipe],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit {
  brandsList: WritableSignal<IBrand[]> = signal([]);

  constructor(private brands: BrandsService) { }
  ngOnInit(): void {
    this.displayBrands()
  }

  displayBrands() {
    this.brands.getBrands().subscribe({
      next: (res) => {
        console.log(res);
        this.brandsList.set(res.data)

      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
