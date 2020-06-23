import { Comment } from './../_models/comment.model';
import { Constant } from './../../constants/Constant';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObservedValueOf, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient) { }

  getAllComment(bookId: number) {
    return this.http.get<any>(Constant.COMMENT_URL + '/' + bookId);
  }

  getCommentById(commentId: number) {
    return this.http.get<any>(Constant.COMMENT_URL + '/comment/' + commentId);
  }

  postComment(bookId: number, message: string) {
    return this.http.post<any>(Constant.COMMENT_URL + '/' + bookId, {message} );
  }

  updateComment(commentId: number, message: string) {
    return this.http.put<any>(Constant.COMMENT_URL + '/' + commentId, {message} );
  }

  deleteComment(commentId: number) {
    return this.http.delete<any>(Constant.COMMENT_URL + '/' + commentId);
  }
}