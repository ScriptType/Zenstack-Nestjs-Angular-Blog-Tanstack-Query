import { Injectable, signal, computed } from '@angular/core';
import { authClient, type Session, type User } from './auth-client';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _session = signal<Session | null>(null);
  readonly session = computed(() => this._session());
  readonly user = computed<User | null>(() => this._session()?.user ?? null);
  readonly isAuthenticated = computed(() => !!this._session()?.user);

  constructor() {
    this.refreshSession();
  }

  async refreshSession() {
    const { data } = await authClient.getSession();
    console.log(data);
    this._session.set(data ?? null);
  }

  async signInEmail(email: string, password: string) {
    const { error } = await authClient.signIn.email({ email, password });
    if (!error) await this.refreshSession();
    return { error };
  }

  async signUpEmail(email: string, password: string, name: string) {
    const { error } = await authClient.signUp.email({ email, password, name });
    if (!error) await this.refreshSession();
    return { error };
  }

  async signOut() {
    await authClient.signOut();
    this._session.set(null);
  }
}
