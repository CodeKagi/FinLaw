import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
// adjust path if needed
import { environment } from 'src/environments/environment';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthenticationService } from '../services/authentication.service';
import { trigger, transition, style, animate } from '@angular/animations';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false, // keep as you added

  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0, transform: 'translateY(10px)' }), animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))]),
      transition(':leave', [animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-10px)' }))]),
    ]),
  ],
})
export class LoginComponent {
  version: string | null = environment.version;
  hidePassword = true;
  form: FormGroup;
  isSubmitting = false;
  loginError: string | null = null;

  private readonly MOCK_USERNAME = 'johndoe';
  private readonly MOCK_PASSWORD = '123456';

  constructor(
    private readonly _router: Router,
    private readonly _route: ActivatedRoute,
    private readonly _authService: AuthenticationService,
    private readonly _fb: FormBuilder,
  ) {
    this.form = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      rememberMe: [false],
    });

    // Clear error when user types
    this.form.valueChanges.subscribe(() => {
      this.loginError = null;
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { username, password, rememberMe } = this.form.value;

    // Mock credential validation first
    if (username !== this.MOCK_USERNAME || password !== this.MOCK_PASSWORD) {
      this.loginError = 'Invalid username or password.';
      // mark password control with error for styling
      this.form.get('password')?.setErrors({ invalid: true });
      return;
    }

    this.isSubmitting = true;
    this.loginError = null;

    this._authService
      .login({
        username: username!,
        password: password!,
        remember: rememberMe,
      })
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res) => {
          this.isSubmitting = false;
          if (res) {
            this._router.navigate([this._route.snapshot.queryParams['redirect'] || '/dashboard'], { replaceUrl: true }).then(() => console.log('Navigated to dashboard'));
          }
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Login error', error);
          this.loginError = 'Something went wrong. Please try again.';
        },
      });
  }

  goToRegister(): void {
    this._router.navigate(['/register']);
  }
}
