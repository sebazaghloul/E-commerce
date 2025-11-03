import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CurrencyPipe} from '@angular/common';
import { BrandsService } from '../../../core/services/brands/brands.service';

@Component({
  selector: 'app-brand-details',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './brand-details.component.html',
  styleUrl: './brand-details.component.css'
})
export class BrandDetailsComponent implements OnInit {

  private readonly brandsService = inject(BrandsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  brandId!: string;
  brandDetails: any = {};
  brandProducts: any[] = [];

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.brandId = params.get('id')!;
      this.loadBrandData();
    });
  }

  loadBrandData(): void {
  
    this.brandsService.getSpecificBrand(this.brandId).subscribe({
      next:(res)  => this.brandDetails = res.data,
      error: (err) => console.log(err)
    });

   
    this.brandsService.getProductsByBrand(this.brandId).subscribe({
      next: res => {
        console.log('Brand Products:', res.data);
        this.brandProducts = res.data;
      },
      error: err => console.log(err)
    });
  }
}
