import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ServicesService } from '../services/services.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-update-post',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './update-post.component.html',
  styleUrl: './update-post.component.scss',
  providers: [ServicesService],
})
export class UpdatePostComponent implements OnInit {
  postId = 0;
  postForm: FormGroup;

  constructor(
    private postService: ServicesService,
    private route: ActivatedRoute
  ) {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    // console.log(this.route.params._value.id);
    this.route.params.subscribe((params) => {
      this.postId = params['id'];
      this.getPost(this.postId);
    });
  }

  getPost(id: number) {
    this.postService.getPost(id).subscribe({
      next: (res) => {
        console.log(res);
        //patchValue to update the values
        this.postForm.patchValue({
          title: res.title,
          body: res.body,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    if (this.postForm.status === 'VALID' && this.postForm.touched) {
      this,
        this.postService
          .updatePost(this.postId, this.postForm.value)
          .subscribe({
            next: (res) => {
              alert('updated successfully');
            },
            error: (err) => {
              console.log(err);
            },
          });
    }
  }
}
