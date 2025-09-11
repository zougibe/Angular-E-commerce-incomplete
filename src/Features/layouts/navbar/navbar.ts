import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite';
import { AuthService } from '../../../core/services/auth/auth';
import { CartService } from '../../../core/services/cart/cart';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() showlinks: boolean = true
  isLogin!: boolean
  cartNumber!: number
  constructor(private flowbiteService: FlowbiteService, public auth: AuthService, private cart: CartService) {
    auth.userData.subscribe((res: any) => {
      if (res !== null) {
        this.isLogin = true
      } else {
        this.isLogin = false
      }
    })

    this.cart.cartNumber.subscribe({
      next: (res) => {
        this.cartNumber = res
      }
    })
  }

}
