import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Signal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  // Signal holding the current search query value
  readonly q: Signal<string> = signal('');

  // Simple debounce timer id
  private debounceId: number | null = null;

  ngOnInit(): void {
    // Initialize from current query param
    const initialQ = this.route.snapshot.queryParamMap.get('q') ?? '';
    (this.q as any).set(initialQ);

    // Keep in sync if query params change from outside (e.g., navigation)
    this.route.queryParamMap.subscribe((params) => {
      const next = params.get('q') ?? '';
      if (next !== this.q()) {
        (this.q as any).set(next);
      }
    });
  }

  onInput(value: string) {
    (this.q as any).set(value);

    if (this.debounceId !== null) {
      window.clearTimeout(this.debounceId);
    }
    this.debounceId = window.setTimeout(() => {
      // Update query params without resetting other params
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { q: this.q() || null },
        queryParamsHandling: 'merge',
        replaceUrl: true,
      });
      this.debounceId = null;
    }, 250);
  }

  ngOnDestroy(): void {
    if (this.debounceId !== null) {
      window.clearTimeout(this.debounceId);
      this.debounceId = null;
    }
  }
}
