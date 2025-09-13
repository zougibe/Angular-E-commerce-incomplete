import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CartService } from '../../../core/services/cart/cart';
import { FormsModule } from '@angular/forms';
import { Cart } from '../../../Shared/interfaces/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  imports: [FormsModule]
})
export class Carts implements OnInit {
  cartList: Cart[] = [];
  cartId!: String
  totalPrice: number = 0
  loading: boolean = true

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cartService.getProductToCart().subscribe({
      next: (res) => {
        this.cartList = res.data.products;
        this.totalPrice = res.data.totalCartPrice
        this.loading = false;
        this.cartService.cartNumber.next(res.numberOfCartItems)
        console.log(this.cartList);



      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      },
    });
  }

  updateCart(productId: string, count: number) {
    this.cartService.updateProductToCart(productId, count).subscribe({
      next: (res) => {
        this.totalPrice = res.data.totalCartPrice;
        this.cartList = res.data.products
      }
    })
  }

  removeItem(productId: string) {
    this.cartService.removeProduct(productId).subscribe({
      next: (res) => {
        this.getCart()

      },
    })
  }

  clearAllItems() {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        this.getCart()
      }
    })
  }

}
