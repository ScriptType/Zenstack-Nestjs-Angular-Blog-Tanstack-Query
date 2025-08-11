import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  inject,
  model,
  signal,
  effect,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PostListComponent } from '../../components/post-list/post-list.component';
import { PostFiltersComponent } from '../../components/post-filters/post-filters.component';
import type { PostListItem } from '../../components/post-card/post-card.component';
import {
  useFindManyPost,
  useFindManyUser,
  useInfiniteFindManyPost,
} from '../../../../../../generatedAPI';
import { Prisma, User } from '../../../../../../generatedAPI/__types';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { keepPreviousData } from '@tanstack/angular-query-experimental';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PostListComponent, PostFiltersComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  readonly q = model<string | undefined>('');

  readonly debouncedQ = toSignal(
    toObservable(computed(() => this.q())).pipe(debounceTime(300)),
    { initialValue: this.q() },
  );

  readonly authorId = input<string | null>(null);
  private readonly router = inject(Router);
  private readonly _refreshing = signal(false);
  readonly refreshing = this._refreshing.asReadonly();
  private lastRefreshStart = 0;

  refreshingEffect = effect(() => {
    const isRefreshing =
      this.postQuery.isFetching() &&
      !this.postQuery.isLoading() &&
      !this.postQuery.isFetchingNextPage();

    if (isRefreshing && !this._refreshing()) {
      // Starting refresh
      this.lastRefreshStart = Date.now();
      this._refreshing.set(true);
    } else if (!isRefreshing && this._refreshing()) {
      // Refresh ended - check minimum time
      const elapsed = Date.now() - this.lastRefreshStart;
      const delay = Math.max(0, 1000 - elapsed);

      setTimeout(() => this._refreshing.set(false), delay);
    }
  });

  // Base query args (reactive to q and authorId)
  readonly postArgs = computed<Prisma.PostFindManyArgs>(() => {
    const q = this.debouncedQ();
    const authorId = this.authorId();
    const where: Prisma.PostWhereInput = {};
    if (q) {
      where.title = { contains: q };
    }
    if (authorId) {
      where.authorId = authorId;
    }
    return {
      where: Object.keys(where).length ? where : undefined,
      orderBy: { createdAt: 'desc' as const },
      take: PAGE_SIZE,
      // cursor is provided via getNextPageParam -> pageParam by the infinite query
      // skip is set by getNextPageParam
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: { select: { id: true, name: true, email: true } },
      },
    };
  });

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

  // Infinite query; derive next cursor from the last item id of the last page
  readonly postQuery = useInfiniteFindManyPost(this.postArgs, {
    placeholderData: keepPreviousData,
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

  // Flatten pages -> items for the list component
  readonly items = computed<PostListItem[]>(() => {
    const data = this.postQuery.data();
    console.log(data);
    const flat = data?.pages.flatMap((page) => page) ?? [];
    const userListMap = this.userListMap();
    return flat.map((p) => ({
      id: p.id,
      title: p.title,
      content: p.content,
      createdAt: p.createdAt,
      author: p.authorId ? (userListMap[p.authorId] ?? null) : null,
    }));
  });

  readonly loadingInitial = computed(() => this.postQuery.isLoading());

  readonly fetchingNext = computed(() => this.postQuery.isFetchingNextPage());

  loadMore = () => {
    this.postQuery.fetchNextPage({ cancelRefetch: true });
  };

  onAuthorChange = (value: string | null) => {
    this.router.navigate([], {
      queryParams: { authorId: value || null },
      queryParamsHandling: 'merge',
    });
  };
}
