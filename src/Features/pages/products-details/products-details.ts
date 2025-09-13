import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../core/services/products/products';
import { ProductsList } from '../../../Shared/interfaces/products';
import { CartService } from '../../../core/services/cart/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products-details',
  imports: [],
  templateUrl: './products-details.html',
  styleUrl: './products-details.css'
})
export class ProductsDetails implements OnInit {
  id: any
  productDetails!: ProductsList
  loading = true;

  constructor(private activatedRoute: ActivatedRoute, private product: ProductService, private cart: CartService, private toastr: ToastrService) {
    activatedRoute.params.subscribe(res => {
      this.id = res['id']
    })
  }

  ngOnInit() {
    this.getSpecificProduct()
  }

  getSpecificProduct() {
    this.product.getSpecificProduct(this.id).subscribe({
      next: (res) => {
        this.productDetails = res.data
        this.loading = false;
      },
      error: err => {
        console.error('Failed to fetch product details', err);
        this.loading = false;
      }
    })
  }



  addProduct(productId: string) {
    this.cart.addProductToCart(productId).subscribe({
      next: (res) => {
        this.toastr.success(res.message, 'Success', {
          progressBar: true,
          progressAnimation: 'increasing',
          closeButton: true,

        })
      }
    })
  }
}
