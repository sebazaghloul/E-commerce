import { Router, RouterLink } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { InputComponent } from '../../../shared/components/input/input/input.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy, OnInit {
  flag: boolean = true;
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly cookieService = inject(CookieService);

  sub?: Subscription;
  msgError: string = '';
  isLoading: boolean = false;

  ngOnInit(): void {
    this.initForm();
  }

  logInForm!: FormGroup;
  initForm(): void {
    this.logInForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$'),
      ]),
    });
  }

  submitForm(): void {
    if (this.logInForm.valid) {
      // لو فيه اشتراك قديم الغيه
      if (this.sub) {
        this.sub.unsubscribe();
      }

      this.isLoading = true;

      this.sub = this.authService.logInForm(this.logInForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.message === 'success') {
            this.msgError = '';
            this.cookieService.set('token', res.token);

            this.authService.tokenDecode()
            console.log(res.token);
            this.router.navigate(['/home']); // أو أي صفحة بعد اللوجين
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
