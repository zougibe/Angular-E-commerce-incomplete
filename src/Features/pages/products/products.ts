import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/products/products';
import { TitleCasePipe } from '@angular/common';
import { ProductsList } from '../../../Shared/interfaces/products';
import { FilterPipe } from "../../../Shared/pipes/filter-pipe";
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.html',
  imports: [TitleCasePipe, FilterPipe, FormsModule, RouterLink],
})
export class Products implements OnInit {
  productList: ProductsList[] = [];
  loading = true;
  Math: any;
  searchValue: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        console.log(this.productList);

        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading products:', err);
        this.loading = false;
      }
    });
  }
}
