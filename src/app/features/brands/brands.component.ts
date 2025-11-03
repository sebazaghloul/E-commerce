import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands/brands.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-brands',
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent {
  private readonly brandsService: BrandsService = inject(BrandsService);

  brands: any[] = [];

  ngOnInit(): void {
    this.brandsService.showBrands().subscribe({
      next: (res) => {
        this.brands = res.data; // حسب شكل الـ API عندك
      },
      error: (err) => console.log(err),
    });
  }
}
