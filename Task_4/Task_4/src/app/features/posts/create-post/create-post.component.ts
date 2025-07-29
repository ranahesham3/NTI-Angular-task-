import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ServicesService } from '../services/services.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss',

  providers: [ServicesService],
})
export class CreatePostComponent {
  postForm: FormGroup;

  constructor(private postService: ServicesService) {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.postForm.status === 'VALID' && this.postForm.touched) {
      this,
        this.postService
          .createPost({
            ...this.postForm.value,
            userId: 1,
          })
          .subscribe({
            next: (res) => {
              alert('Post added successfully');
            },
            error: (err) => {
              console.log(err);
            },
          });
    }
  }
}
