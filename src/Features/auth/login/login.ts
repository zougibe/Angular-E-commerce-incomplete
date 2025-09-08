import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../../core/services/auth/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  errMsg: string = ''
  isLoading: boolean = false

  constructor(private auth: AuthService, private router: Router) { }

  login: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.minLength(8), Validators.required]),
  })

  onSubmit() {
    this.isLoading = true;
    this.auth.register(this.login.value).subscribe({
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
