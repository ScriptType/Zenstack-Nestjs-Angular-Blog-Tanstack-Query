import { CommonModule, DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
  inject,
  effect,
  model,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Prisma, User } from '../../../../../../generatedAPI/__types';
import {
  useFindUniquePost,
  useDeletePost,
  useFindManyUser,
} from '../../../../../../generatedAPI';
import { ToastService } from '../../../../shared/ui/toast/toast.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'app-post-detail-page',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './post-detail.page.html',
  styleUrl: './post-detail.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailPage {
  // Routed param binding via withComponentInputBinding()
  readonly id = model.required<string>();

  private readonly router = inject(Router);
  private readonly auth: AuthService = inject(AuthService);
  private readonly toast: ToastService = inject(ToastService);

  // Build typed Prisma args
  readonly args = computed<Prisma.PostFindUniqueArgs>(() => {
    const _id = this.id();
    const id = Number(_id);
    console.log(_id);
    return {
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        authorId: true,
      },
    };
  });

  // Load users for author lookup (same pattern as HomePage)
  readonly userQuery = useFindManyUser();
  readonly userList = computed(() => this.userQuery.data() ?? []);
  readonly userListMap = computed(() => {
    const users = this.userList();
    return users.reduce(
      (acc, user) => {
        acc[user.id] = user;
        return acc;
      },
      {} as Record<string, User>,
    );
  });

  // Query and derived signals
  readonly postQuery = useFindUniquePost(this.args);
  readonly authorName = computed(() => {
    const p = this.postQuery.data();
    const id = p?.authorId;
    const map = this.userListMap();
    const u = id ? map[id] : undefined;
    return u?.name || u?.email || 'Unknown';
  });
  // Ownership
  readonly isOwner = computed(() => {
    const user = this.auth.user();
    const p = this.postQuery.data();
    return !!user && !!p && p.authorId === user.id;
  });

  // Delete flow
  readonly confirmOpen = signal(false);
  readonly deleteMutation = useDeletePost();

  openConfirm = () => this.confirmOpen.set(true);
  closeConfirm = () => this.confirmOpen.set(false);

  async confirmDelete() {
    const id = Number(this.id());
    await this.deleteMutation.mutate({ where: { id } });
    this.toast.success('Post deleted');
    this.router.navigateByUrl('/');
  }
}
