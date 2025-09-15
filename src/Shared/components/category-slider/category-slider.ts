import { Component } from '@angular/core';
import { CategoryService } from '../../../core/services/category/category';
import { CategoryData } from '../../interfaces/category-data';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-category-slider',
  imports: [CarouselModule],
  templateUrl: './category-slider.html',
  styleUrl: './category-slider.css'
})
export class CategorySlider {
  categoryList: CategoryData[] = []

  constructor(private cate: CategoryService) { }
  ngOnInit() {
    this.getAllCate()
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  getAllCate() {
    this.cate.getAllCategory().subscribe({
      next: (res) => {
        this.categoryList = res.data
      }
    })
  }
}
