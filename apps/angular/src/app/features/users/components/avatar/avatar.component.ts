import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  // New Angular input() signal API
  readonly name = input<string | null>(null);
  readonly email = input<string | null>(null);
  // Size in pixels for square avatar
  readonly size = input<number>(32);
  // Optional small badge text (e.g., "you", "author")
  readonly badge = input<string | null>(null);

  readonly initials = computed(() => {
    const source = this.name() || this.email() || '?';
    return source.trim().slice(0, 1).toUpperCase();
  });

  readonly style = computed(() => {
    const px = `${this.size()}px`;
    return { width: px, height: px, lineHeight: px };
  });
}
