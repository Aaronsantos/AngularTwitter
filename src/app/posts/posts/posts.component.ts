import { Component, OnInit } from '@angular/core';
import {Post} from '../../shared/Post';
import {PostsService} from '../../shared/posts.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: Observable<Post[]>;
  postsSabadoTematico: Observable<Post[]>;
  postsDm: Observable<Post[]>;
  post = new Post("")

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSabadoTematico = this.postsService.getPostsSabadoTematico()
    this.postsDm = this.postsService.getPostsDm()
  }

  enviarPost() {
    this.postsService.enviarPost(this.post);
  }

}
