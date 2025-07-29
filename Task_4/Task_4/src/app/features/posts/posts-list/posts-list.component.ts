import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { RouterModule } from '@angular/router';

type Post = { userId: number; id: number; title: string; body: string };

@Component({
  selector: 'app-posts-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './posts-list.component.html',
  styleUrl: './posts-list.component.scss',
  providers: [ServicesService],
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];
  constructor(private postService: ServicesService) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.postService.getPosts().subscribe({
      next: (res) => {
        console.log(res);
        this.posts = res || [];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe({
      next: (res) => {
        console.log(res);
        this.getPosts();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
