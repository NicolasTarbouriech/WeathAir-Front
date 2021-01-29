import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Topic } from "./topic.model";

@Injectable({
    providedIn: 'root'
  })
  export class TopicService {
    
    topicSubject = new Subject<Topic>();
  
  
    constructor(private http: HttpClient, private _router: Router) {}

        getAllTopics(): Observable<Topic[]> {
            return this.http.get<Topic[]>(`${environment.api.BASE_URL}forum/topics`);
          }
        
        getTopicById(id:number): Observable<Topic> {
            return this.http.get<Topic>(`${environment.api.BASE_URL}forum/topics/${id}`);
          }
        
        
        postTopic(topic: Topic): Observable<Topic>{
            return this.http.post<Topic>(`${environment.api.BASE_URL}forum/topics`, topic, {withCredentials : true});
          }
        
        putTopic(id : number, topic : Topic): Observable<Topic> {
            return this.http.put<Topic>(`${environment.api.BASE_URL}forum/topics/${id}`, topic);
        }
        
        deleteTopic(id: number) : Observable<Topic> {
            return this.http.delete<Topic>(`${environment.api.BASE_URL}forum/topics/${id}`);
        }

        //   sendToTopicSubject(topic: Topic) {
        //     this.topicSubject.next(topic);
        // }
        
         
    }