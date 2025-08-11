import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: number;
  type: ToastType;
  title?: string;
  message?: string;
  duration?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private _id = 0;
  readonly toasts = signal<Toast[]>([]);

  show(opts: Partial<Toast> & { message?: string; title?: string; type?: ToastType; duration?: number } = {}): number {
    const id = ++this._id;
    const toast: Toast = {
      id,
      type: opts.type ?? 'info',
      title: opts.title,
      message: opts.message ?? '',
      duration: opts.duration ?? 3000,
    };
    this.toasts.update((list) => [...list, toast]);

    // Auto-dismiss
    if (toast.duration && toast.duration > 0) {
      window.setTimeout(() => this.dismiss(id), toast.duration);
    }
    return id;
  }

  dismiss(id: number) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }

  success(message: string, title?: string, duration = 3000) {
    return this.show({ type: 'success', message, title, duration });
  }

  error(message: string, title?: string, duration = 4000) {
    return this.show({ type: 'error', message, title, duration });
  }

  info(message: string, title?: string, duration = 3000) {
    return this.show({ type: 'info', message, title, duration });
  }

  warning(message: string, title?: string, duration = 3500) {
    return this.show({ type: 'warning', message, title, duration });
  }
}