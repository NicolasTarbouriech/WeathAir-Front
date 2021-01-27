import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Message } from "./message.models";


@Injectable({
    providedIn: 'root'
  })
  export class MessageService {
    
    topicSubject = new Subject<Message>();
  
  
    constructor(private http: HttpClient, private _router: Router) {}

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

        //   sendToTopicSubject(topic: Topic) {
        //     this.topicSubject.next(topic);
        // }
        
         
    }