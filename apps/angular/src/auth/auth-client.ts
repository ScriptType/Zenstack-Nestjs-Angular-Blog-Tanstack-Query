import { createAuthClient } from 'better-auth/client';

export const authClient = createAuthClient({
  // point to your auth server (include base path if not /api/auth)
  // baseURL: import.meta.env['NG_APP_AUTH_URL'] ?? 'http://localhost:3000/api/auth',
  baseURL: 'http://localhost:3000', // Adjust this URL as needed
});
export type Session = typeof authClient.$Infer.Session;
export type User = (typeof authClient.$Infer.Session)['user'];
