import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  errMsg: string = ''
  isLoading: boolean = false

  constructor(private auth: AuthService, private router: Router) { }


  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.minLength(3), Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
    rePassword: new FormControl('', [Validators.minLength(8), Validators.required]),
    phone: new FormControl('', [Validators.pattern(/^01[0125][0-9]{8}$/)]),
  })


  onSubmit() {
    this.isLoading = true;
    this.auth.register(this.registerForm.value).subscribe({
      next: (res) => {
        this.isLoading = false;
        if (res.message == 'success') {
          this.router.navigate(["/login"])
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
