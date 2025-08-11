import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  showPassword = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  async submit() {
    this.error.set(null);
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { email, password } = this.form.getRawValue();
    try {
      const { error } = await this.auth.signInEmail(email!, password!);
      if (error) {
        this.error.set((error as any)?.message ?? 'Failed to sign in');
      } else {
        await this.router.navigateByUrl('/');
      }
    } catch (e: any) {
      this.error.set(e?.message ?? 'Something went wrong');
    } finally {
      this.loading.set(false);
    }
  }
}