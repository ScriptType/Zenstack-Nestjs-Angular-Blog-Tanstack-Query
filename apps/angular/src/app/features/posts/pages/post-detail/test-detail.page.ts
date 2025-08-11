import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  effect,
  numberAttribute,
} from '@angular/core';
import { useFindUniquePost } from '../../../../../../generatedAPI';

@Component({
  selector: 'app-post-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: `{{ something() }}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestDetailPage {
  id = input.required({ transform: numberAttribute });

  constructor() {
    effect(() => {
      const id = this.id();
      console.log(id);
    });
  }

  findUniquePostArgs = computed(() => {
    const id = this.id();
    return { where: { id } };
  });

  findUniquePostQuery = useFindUniquePost(this.findUniquePostArgs);

  readonly something = computed(() => {
    const id = this.id();
    console.log(id);
  });

  ngOnInit() {
    this.something();
  }
}
