import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-post-skeleton',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-skeleton.component.html',
  styleUrl: './post-skeleton.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostSkeletonComponent {
  // Optional how many skeleton cards to render
  readonly count = input(1);
}