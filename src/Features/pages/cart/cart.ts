import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  imports: [FormsModule]
})
export class Cart implements OnInit {
  cartData: any;
  loading = true;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.cartService.getProductToCart().subscribe({
      next: (res) => {
        this.cartData = res.data;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  updateCart(productId: string, count: number) {
    this.cartService.updateProductToCart(productId, count).subscribe({
      next: (res) => {
        this.cartData = res.data;
      }
    })
  }

  removeItem(id: string) {
    this.cartService.removeProduct(id).subscribe({
      next: (res) => {
        this.cartData = res.data;
      }
    })
  }

  clearAllItems() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.cartData = ''
      }
    })
  }

}
