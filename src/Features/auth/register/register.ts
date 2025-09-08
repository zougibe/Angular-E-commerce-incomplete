
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

export function matchPasswords(password: string, rePassword: string): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const pwd = formGroup.get(password)?.value;
    const confirmPwd = formGroup.get(rePassword)?.value;

    return pwd === confirmPwd ? null : { passwordMismatch: true };
  };

}

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './register.html',
  styleUrl: './register.css'
})

export class Register {
  errMsg: string = '';
  isLoading: boolean = false;
  showPassword: boolean = false;
  showRePassword: boolean = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleRePassword() {
    this.showRePassword = !this.showRePassword;
  }

  constructor(private auth: AuthService, private router: Router) { }

  registerForm: FormGroup = new FormGroup(
    {
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        strongPasswordValidator()
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.pattern(/^01[0125][0-9]{8}$/)
      ]),
    },
    { validators: matchPasswords('password', 'rePassword') }
  );

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.isLoading = true;
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.message == 'success') {
          this.router.navigate(['/login']);
          this.errMsg = '';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.errMsg = err.error.message;
      }
    });
  }
}
