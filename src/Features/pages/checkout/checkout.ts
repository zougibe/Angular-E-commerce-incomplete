import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../core/services/cart/cart';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {
  isLoading: boolean = false
  cartId!: string

  constructor(private activatedRoute: ActivatedRoute, private cart: CartService) {
    activatedRoute.params.subscribe({
      next: (res) => {
        console.log(res);
        this.cartId = res['id']
      }
    })
  }

  checkout: FormGroup = new FormGroup({
    details: new FormControl(null),
    city: new FormControl(null),
    phone: new FormControl(null),
  })



  onSubmit() {
    this.isLoading = true;
    this.cart.checkout(this.cartId, this.checkout.value).subscribe({
      next: (res) => {
        console.log(res);
        window.location.href = res.session.url
      }
    })
  }
}
