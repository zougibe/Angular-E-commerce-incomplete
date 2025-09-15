import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FlowbiteService } from '../../../core/services/flowbite/flowbite';
import { AuthService } from '../../../core/services/auth/auth';
import { CartService } from '../../../core/services/cart/cart';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input() showlinks: boolean = true
  isLogin: boolean = false
  cartNumber!: number
  constructor(private flowbiteService: FlowbiteService, private auth: AuthService, private cart: CartService, private router: Router, private toastr: ToastrService) {
    if (auth.userData) {
      this.isLogin = true
    }

    this.cart.cartNumber.subscribe({
      next: (res) => {
        this.cartNumber = res
      }
    })
  }

  signOut() {
    this.isLogin = false
    localStorage.removeItem('userToken')
    this.toastr.error('You are singed out', 'Sign Out', {
      timeOut: 3000,
      progressBar: true
    })
  }

}
