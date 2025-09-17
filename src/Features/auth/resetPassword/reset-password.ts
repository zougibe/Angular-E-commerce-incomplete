import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ResetPassword } from '../../../core/services/resetPassword/reset-password';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';


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
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})

export class ResetPasswords {
  isLoading: boolean = false
  steps: number = 1

  constructor(private reset: ResetPassword, private toastr: ToastrService, private auth: AuthService, private router: Router) { }

  sendEmail: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  })

  SubmitEmail() {
    this.reset.verifyEmail(this.sendEmail.value).subscribe({
      next: (res) => {
        if (res.statusMsg == 'success') {
          this.toastr.info(`${res.message}`, 'Success',
            {
              positionClass: 'toast-bottom-left',
              progressAnimation: 'decreasing',
              timeOut: 2000
            }
          )
          this.steps = 2

        }
      },
      error: (res) => {
        this.toastr.error(`${res.message}`, 'Fail',
          {
            positionClass: 'toast-bottom-left',
            progressAnimation: 'decreasing',
            timeOut: 2000
          }
        )
      }
    })
  }


  verifyCode: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^|w{6}$/)])
  })

  SubmitCode() {
    this.reset.verifyCode(this.verifyCode.value).subscribe({
      next: (res) => {
        if (res.status == 'Success') {
          this.steps = 3
        }
      }, error: () => {

      }
    })
  }

  resetPassword: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required,
    Validators.minLength(8),
    strongPasswordValidator()])
  })

  SubmitPassword() {
    this.reset.resetPassword(this.resetPassword.value).subscribe({
      next: (res) => {
        if (res.token) {
          localStorage.setItem('userToken', res.token);
          this.auth.userData;
          this.router.navigate(['/home'])
        }
      }
    })
  }


}
