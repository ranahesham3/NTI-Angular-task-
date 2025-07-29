import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type Post = { userId: number; id: number; title: string; body: string };

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  private url = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}

  getPosts(): Observable<any> {
    return this.http.get(`${this.url}`);
  }

  getPost(id: number): Observable<any> {
    return this.http.get(`${this.url}/${id}`);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  updatePost(id: number, body: object): Observable<any> {
    return this.http.patch(`${this.url}/${id}`, body);
  }

  createPost(body: object): Observable<any> {
    return this.http.post(`${this.url}`, body);
  }
}
