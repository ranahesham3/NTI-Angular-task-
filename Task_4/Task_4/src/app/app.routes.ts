import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  {
    path: 'posts',
    loadComponent: () =>
      import('./features/posts/posts-list/posts-list.component').then(
        (c) => c.PostsListComponent
      ),
  },
  {
    path: 'update/:id',
    loadComponent: () =>
      import('./features/posts/update-post/update-post.component').then(
        (c) => c.UpdatePostComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import('./features/posts/create-post/create-post.component').then(
        (c) => c.CreatePostComponent
      ),
  },
];
