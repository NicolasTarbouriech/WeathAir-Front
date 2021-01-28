import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Message } from "./message.models";
import { Post } from "./post.models";

@Injectable({
    providedIn: 'root'
  })
  export class  PostService {
    
    postSubject = new Subject<Post>();
  
  
    constructor(private http: HttpClient, private _router: Router) {}

        getAllPostsByTopic(topic_id : number): Observable<Post[]> {
            return this.http.get<Post[]>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts`);
          }
        
        getPostsDetails(topic_id : number, post_id : number): Observable<Post[]> {
            return this.http.get<Post[]>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts/${post_id}`);
          }
        
        
        postPost( topic_id : number, post : Post): Observable<Post>{
            return this.http.post<Post>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts`, post, { withCredentials : true });
          }
        
        putTopic(topic_id : number, post_id : number, post : Post): Observable<Post> {
            return this.http.put<Post>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts/${post_id}`, post, { withCredentials : true });
        }
        
        deletePost(topic_id : number, post_id : number) : Observable<Post> {
            return this.http.delete<Post>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts/${post_id}`, { withCredentials : true });
        }

        getAllMessages(topic_id : number, post_id:number): Observable<Message[]> {
          return this.http.get<Message[]>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts/${post_id}/messages`);
        }
      
      getMessageById(topic_id : number, post_id:number, message_id : number): Observable<Message> {
          return this.http.get<Message>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts/${post_id}/messages/${message_id}`);
        }
      
        postMessage(topic_id: number, post_id : number, message : Message): Observable<Message>{
          return this.http.post<Message>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts/${post_id}/messages`, message, {withCredentials : true});
        }
        
        putMessage(topic_id: number, post_id : number, message_id : number, message : Message): Observable<Message> {
          return this.http.put<Message>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts/${post_id}/messages/${message_id}`, message, {withCredentials : true} );
      }
      
      deleteMessage(topic_id: number, post_id : number, message_id : number) : Observable<Message> {
          return this.http.delete<Message>(`${environment.api.BASE_URL}forum/topics/${topic_id}/posts/${post_id}/messages/${message_id}`, {withCredentials : true} );
      }
         
    }