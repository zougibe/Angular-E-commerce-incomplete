
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { AuthService } from '../../../core/services/auth/auth';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

export function strongPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const validLength = value.length >= 8;

    const passwordValid =
      hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar && validLength;

    return !passwordValid ? { weakPassword: true } : null;
  };
}

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
      Validators.minLength(8),
      strongPasswordValidator()
    ]),
  })

  onSubmit() {
    this.isLoading = true;
    this.auth.login(this.login.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.message == 'success') {
          this.router.navigate(["/home"])
          this.errMsg = ''
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message
      }
    })
  }
}
