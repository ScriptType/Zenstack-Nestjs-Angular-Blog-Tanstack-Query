import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  PostCardComponent,
  type PostListItem,
} from '../post-card/post-card.component';
import { PostSkeletonComponent } from '../post-skeleton/post-skeleton.component';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, PostCardComponent, PostSkeletonComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent {
  // Inputs as signals (Angular 17+)
  readonly posts = input<PostListItem[]>([]);
  readonly loading = input(false);
  readonly hasMore = input(false);
  readonly loadingMore = input(false);

  // Outputs (Angular 17+)
  readonly loadMore = output<void>();
}
