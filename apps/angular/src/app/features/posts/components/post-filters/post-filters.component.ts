import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  output,
} from '@angular/core';
import type { User } from '../../../../../../generatedAPI/__types';

@Component({
  selector: 'app-post-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-filters.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFiltersComponent {
  // Inputs (signals)
  readonly q = model<string | undefined>('');
  readonly authors = input<User[]>([]);
  readonly authorId = model<string | null>(null);
}
