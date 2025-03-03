import { CategoriesService } from './../../core/services/categories.service';
import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {
  categoriesList: WritableSignal<ICategory[]> = signal([]);
  constructor(private categories: CategoriesService) { }
  ngOnInit(): void {
    this.displayCategories()
  }

  displayCategories() {
    this.categories.getCategories().subscribe({
      next: (res) => {
        this.categoriesList.set(res.data)
        console.log(res);

      }, error: (err) => {
        console.log(err);

      }
    })
  }
}
