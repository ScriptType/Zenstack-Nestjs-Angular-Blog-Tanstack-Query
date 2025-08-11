import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  PostEditorFormComponent,
  type PostEditorValue,
} from '../../components/post-editor-form/post-editor-form.component';
import {
  useFindUniquePost,
  useUpdatePost,
} from '../../../../../../generatedAPI';
import { Prisma } from '../../../../../../generatedAPI/__types';
import { ToastService } from '../../../../shared/ui/toast/toast.service';

@Component({
  selector: 'app-edit-post-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PostEditorFormComponent],
  templateUrl: './edit.page.html',
  styleUrl: './edit.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPostPage {
  // Routed param binding via withComponentInputBinding()
  readonly id = input.required<string>();

  private readonly router = inject(Router);
  private readonly toast: ToastService = inject(ToastService);
  private readonly updatePost = useUpdatePost();

  // Load current post
  readonly args = computed<Prisma.PostFindUniqueArgs>(() => {
    const id = Number(this.id());
    return { where: { id }, select: { id: true, title: true, content: true } };
  });
  readonly postQuery = useFindUniquePost(() => this.args());
  readonly initialTitle = computed(() => this.postQuery.data()?.title ?? '');
  readonly initialContent = computed(
    () => this.postQuery.data()?.content ?? '',
  );

  async handleSubmit(value: PostEditorValue) {
    const id = Number(this.id());
    const updated = await this.updatePost.mutateAsync({
      where: { id },
      data: {
        title: value.title,
        content: value.content,
      },
      select: { id: true },
    });
    if (updated?.id) {
      this.toast.success('Post updated');
      this.router.navigate(['/post', updated.id]);
    }
  }

  handleCancel() {
    this.router.navigate(['/post', Number(this.id())]);
  }
}
