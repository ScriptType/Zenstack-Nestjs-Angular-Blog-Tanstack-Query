import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface PostListItem {
  id: number;
  title: string;
  content?: string | null;
  createdAt: string | Date;
  author?: { id: string; name?: string | null; email?: string | null } | null;
}

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostCardComponent {
  readonly post = input.required<PostListItem>();
}
