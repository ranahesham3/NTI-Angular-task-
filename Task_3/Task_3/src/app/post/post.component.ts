import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';

@Component({
    selector: 'app-post',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './post.component.html',
    styleUrl: './post.component.scss',
    providers: [PostService],
})
export class PostComponent implements OnInit {
    posts: { userId: number; id: number; title: string; body: string }[] = [];

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts() {
        this.postService.getPosts().subscribe({
            next: (res) => {
                console.log(res);
                this.posts = JSON.parse(JSON.stringify(res));
            },
            error: (err) => {
                console.log(err);
            },
        });
    }
}
