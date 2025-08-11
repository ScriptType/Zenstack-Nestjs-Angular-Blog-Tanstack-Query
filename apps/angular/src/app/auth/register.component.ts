import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
  });

  showPassword = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  readonly passwordMismatch = computed(() => {
    const { password, confirmPassword } = this.form.getRawValue();
    return (password ?? '') !== (confirmPassword ?? '');
  });

  async submit() {
    this.error.set(null);
    if (this.form.invalid || this.passwordMismatch()) {
      this.form.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    const { name, email, password } = this.form.getRawValue();
    try {
      const { error } = await this.auth.signUpEmail(email!, password!, name!);
      if (error) {
        this.error.set((error as any)?.message ?? 'Failed to register');
      } else {
        await this.router.navigateByUrl('/login');
      }
    } catch (e: any) {
      this.error.set(e?.message ?? 'Something went wrong');
    } finally {
      this.loading.set(false);
    }
  }
}