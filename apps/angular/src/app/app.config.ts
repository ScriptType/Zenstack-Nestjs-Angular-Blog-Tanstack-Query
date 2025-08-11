import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideAngularQueryContext } from '@zenstackhq/tanstack-query/runtime-v5/angular';
import {
  provideTanStackQuery,
  QueryClient,
  withDevtools,
} from '@tanstack/angular-query-experimental';

import type { FetchFn } from '@zenstackhq/tanstack-query/runtime';

export const myFetch: FetchFn = (url, options = {}) =>
  fetch(url, {
    ...options,
    // ensure cookies go with every request
    credentials: options.credentials ?? 'include',
    headers: {
      ...(options.headers ?? {}),
    },
  });

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideTanStackQuery(new QueryClient(), withDevtools()),
    provideAngularQueryContext({
      endpoint: 'http://localhost:3000/v1/api/rpc',
      fetch: myFetch,
      logging: true,
    }),
    provideRouter(routes, withComponentInputBinding()),
  ],
};
