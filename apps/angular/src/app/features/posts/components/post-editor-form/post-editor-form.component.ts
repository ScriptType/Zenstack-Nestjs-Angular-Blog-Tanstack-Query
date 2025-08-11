import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';

export interface PostEditorValue {
  title: string;
  content: string;
}

@Component({
  selector: 'app-post-editor-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-editor-form.component.html',
  styleUrl: './post-editor-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditorFormComponent {
  // Initial values supplied by parent (Edit will pass loaded values; Compose empty)
  readonly initialTitle = input<string>('');
  readonly initialContent = input<string>('');

  // Outputs
  readonly submitted = output<PostEditorValue>();
  readonly cancelled = output<void>();

  // Local editable state
  readonly title = signal<string>('');
  readonly content = signal<string>('');

  // Ensure we hydrate once when initial values arrive (e.g., after async load in Edit)
  private readonly initialized = signal(false);
  constructor() {
    effect(() => {
      const t = this.initialTitle();
      const c = this.initialContent();
      if (!this.initialized() && (t !== '' || c !== '')) {
        this.title.set(t);
        this.content.set(c);
        this.initialized.set(true);
      }
    });
  }

  // Validation: both required (per request)
  readonly canSubmit = computed(() => {
    const t = this.title().trim();
    const c = this.content().trim();
    return t.length > 0 && c.length > 0;
  });

  onSubmit() {
    if (!this.canSubmit()) return;
    this.submitted.emit({
      title: this.title().trim(),
      content: this.content().trim(),
    });
  }

  onCancel() {
    this.cancelled.emit();
  }
}
