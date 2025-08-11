import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  useFindUniqueUser,
  useInfiniteFindManyPost,
} from '../../../../../../generatedAPI';
import { Prisma } from '../../../../../../generatedAPI/__types';
import { PostListComponent } from '../../../posts/components/post-list/post-list.component';
import type { PostListItem } from '../../../posts/components/post-card/post-card.component';
import { AvatarComponent } from '../../components/avatar/avatar.component';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PostListComponent, AvatarComponent],
  templateUrl: './profile.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage {
  // Routed param binding via withComponentInputBinding()
  readonly id = input.required<string>();

  // Load the author/user
  readonly userArgs = computed<Prisma.UserFindUniqueArgs>(() => {
    const id = this.id();
    return {
      where: { id },
      select: { id: true, name: true, email: true },
    };
  });
  readonly userQuery = useFindUniqueUser(this.userArgs());
  readonly user = computed(() => this.userQuery.data());

  // Author posts (infinite)
  readonly postArgs = computed<Prisma.PostFindManyArgs>(() => {
    const authorId = this.id();
    return {
      where: { authorId },
      orderBy: { createdAt: 'desc' as const },
      take: PAGE_SIZE,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        authorId: true,
      },
    };
  });

  readonly postQuery = useInfiniteFindManyPost(this.postArgs(), {
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      const fetched = pages.flatMap((item) => item).length;
      return {
        ...this.postArgs(),
        skip: fetched,
      };
    },
  });

  readonly items = computed<PostListItem[]>(() => {
    const data = this.postQuery.data();
    const flat = data?.pages.flatMap((page) => page) ?? [];
    const u = this.user();
    return flat.map((p) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      createdAt: p.createdAt,
      author: u ? { id: u.id, name: u.name, email: u.email } : null,
    }));
  });

  readonly loading = computed(
    () =>
      this.userQuery.isLoading() ||
      this.postQuery.isLoading() ||
      this.postQuery.isFetching() ||
      this.postQuery.isFetchingNextPage(),
  );

  loadMore = () => {
    this.postQuery.fetchNextPage({ cancelRefetch: true });
  };
}
