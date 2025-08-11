import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/posts/pages/home/home.page').then(
            (m) => m.HomePage,
          ),
      },
      {
        path: 'post/:id',
        loadComponent: () =>
          import('./features/posts/pages/post-detail/post-detail.page').then(
            (m) => m.PostDetailPage,
          ),
      },

      {
        path: 'test/:id',
        loadComponent: () =>
          import('./features/posts/pages/post-detail/test-detail.page').then(
            (m) => m.TestDetailPage,
          ),
      },
      {
        path: 'compose',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/posts/pages/compose/compose.page').then(
            (m) => m.ComposePage,
          ),
      },
      {
        path: 'edit/:id',
        canActivate: [authGuard],
        loadComponent: () =>
          import('./features/posts/pages/edit/edit.page').then(
            (m) => m.EditPostPage,
          ),
      },
      {
        path: 'u/:id',
        loadComponent: () =>
          import('./features/users/pages/profile/profile.page').then(
            (m) => m.ProfilePage,
          ),
      },
    ],
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./auth/register.component').then((m) => m.RegisterComponent),
  },
  { path: '**', redirectTo: '' },
];
