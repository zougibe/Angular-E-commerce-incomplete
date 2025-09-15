import { Component } from '@angular/core';
import { Products } from "../products/products";
import { HomeSlider } from "../../../Shared/components/home-slider/home-slider";
import { CategorySlider } from "../../../Shared/components/category-slider/category-slider";

@Component({
  selector: 'app-home',
  imports: [Products, HomeSlider, CategorySlider],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
