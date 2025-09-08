
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { AuthService } from '../../../core/services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  errMsg: string = ''
  isLoading: boolean = false
  showPassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  constructor(private auth: AuthService, private router: Router) { }

  login: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
    ]),
  })

  onSubmit() {
    this.isLoading = true;
    this.auth.login(this.login.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.message == 'success') {
          this.router.navigate(["/home"]);
          localStorage.setItem('userToken', res.token);
          this.auth.decodeUserData();
          this.errMsg = ''
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message
        console.log(err.error.message);

      }
    })
  }
}
