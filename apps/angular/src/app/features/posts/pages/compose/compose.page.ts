import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  PostEditorFormComponent,
  type PostEditorValue,
} from '../../components/post-editor-form/post-editor-form.component';
import {
  useCreatePost,
  useFindManyPost,
  useFindManyUser,
} from '../../../../../../generatedAPI';
import { ToastService } from '../../../../shared/ui/toast/toast.service';
import { AuthService } from '../../../../../auth/auth.service';

@Component({
  selector: 'app-compose-page',
  standalone: true,
  imports: [CommonModule, RouterLink, PostEditorFormComponent],
  templateUrl: './compose.page.html',
  styleUrl: './compose.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComposePage {
  private readonly router = inject(Router);
  private readonly toast: ToastService = inject(ToastService);
  private readonly auth: AuthService = inject(AuthService);
  private readonly createPost = useCreatePost({ optimisticUpdate: true });

  async handleSubmit(value: PostEditorValue) {
    const u = this.auth.user();
    if (!u?.id) {
      this.toast.error('You must be signed in');
      return;
    }
    this.createPost.mutate({
      data: {
        title: value.title,
        content: value.content,
        authorId: u.id,
      },
    });

    // if (created?.id) {
    //   this.toast.success('Post created');
    //   this.router.navigate(['/post', created.id]);
    // }
  }

  handleCancel() {
    this.router.navigate(['/']);
  }
}
