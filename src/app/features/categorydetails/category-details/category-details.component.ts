import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoriesService } from '../../../core/services/categories/categories.service';
import { CurrencyPipe} from '@angular/common';
@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  imports: [CurrencyPipe,RouterLink],
  styleUrl: './category-details.component.css'
})
export class CategoryDetailsComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
  private readonly activatedRoute = inject(ActivatedRoute);

  categoryId!: string;
  categoryDetails: any = {};
  categoryProducts: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.categoryId = params.get('id')!;
      this.loadCategoryData();
    });
  }

  loadCategoryData(): void {
  
    this.categoriesService.getSpecificCategories(this.categoryId).subscribe({
      next: res => this.categoryDetails = res.data,
      error: err => console.log(err)
    });

  
    this.categoriesService.getProductsByCategory(this.categoryId).subscribe({
      next: res => this.categoryProducts = res.data,
      error: err => console.log(err)
    });
  }
}
