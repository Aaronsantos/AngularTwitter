import { Injectable } from '@angular/core';
import {Post} from './Post';
import {AngularFirestoreCollection, AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  postsCol:AngularFirestoreCollection<Post>
  postsSabadoTematicoCol:AngularFirestoreCollection<Post>
  postsDmCol:AngularFirestoreCollection<Post>
  constructor(private afs:AngularFirestore) {
    this.postsCol = afs.collection('posts');
    this.postsSabadoTematicoCol = afs.collection('posts', ref => ref.where('texto', '>', '#sabadotematico').where('texto', '<', '#sabadotematicoz'));
    this.postsDmCol = afs.collection('posts', ref => ref.where('texto', '>', '@').where('texto', '<', '@z'));
  }

  getPosts(): Observable<Post[]> {
    return this.postsCol.valueChanges();
  }

  enviarPost(post: Post) {
    this.postsCol.add({texto: post.texto});
  }

  getPostsSabadoTematico(): Observable<Post[]> {
    return this.postsSabadoTematicoCol.valueChanges();
  }

  getPostsDm(): Observable<Post[]> {
    return this.postsDmCol.valueChanges();
  }
}
