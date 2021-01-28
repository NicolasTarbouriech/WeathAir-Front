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

        getAllPosts(): Observable<Post[]> {
            return this.http.get<Post[]>(`${environment.api.BASE_URL}forum/topics/posts`);
          }
        
        getPostById(id:number): Observable<Post[]> {
            return this.http.get<Post[]>(`${environment.api.BASE_URL}forum/topics/${id}/posts`);
          }
        
        
        postPost( post: Post): Observable<Post>{
            return this.http.post<Post>(`${environment.api.BASE_URL}forum/topics/posts`, post);
          }
        
        putTopic(id : number, post : Post): Observable<Post> {
            return this.http.put<Post>(`${environment.api.BASE_URL}forum/topics/${id}/posts`, post);
        }
        
        deletePost(id: number) : Observable<Post> {
            return this.http.delete<Post>(`${environment.api.BASE_URL}forum/topics/${id}/posts`);
        }

        getAllMessages(): Observable<Message[]> {
          return this.http.get<Message[]>(`${environment.api.BASE_URL}forum/topics/messages`);
        }
      
      getTopicByMessage(id:number): Observable<Message> {
          return this.http.get<Message>(`${environment.api.BASE_URL}forum/topics/messages/${id}`);
        }
      
        postMessage(topic: Message): Observable<Message>{
          return this.http.post<Message>(`${environment.api.BASE_URL}forum/topics/messages`, topic);
        }
        
        putMessage(id : number, topic : Message): Observable<Message> {
          return this.http.put<Message>(`${environment.api.BASE_URL}forum/topics/messages/${id}`, topic);
      }
      
      deleteMessage(id: number) : Observable<Message> {
          return this.http.delete<Message>(`${environment.api.BASE_URL}forum/topics/messages/${id}`);
      }
         
    }