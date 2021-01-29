import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { findIndex } from 'rxjs/operators';
import { Message } from '../../core/message.models';
import { Post } from '../../core/Post.models';
import { PostService } from '../../core/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  messageName :string;
  printPostForm = false;
  postList: Post[]= [];
  messageList : Message[] = [];
  postTitle : string;
  postText : string;
  topic_id : number;
  post_id : number;
  getPostById : Post [];
  constructor(private postService: PostService, 
    private router:Router, private route: ActivatedRoute) {
      
    }

  ngOnInit(): void {
    this.printPostForm;
    this.topic_id = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(this.topic_id);
    console.log(this.post_id);
      this.showPostById();
  }

  printPostToTrue(){
    this.printPostForm = true;
  }

  showPostById() {
  return this.postService.getAllPostsByTopic(this.topic_id)
      .subscribe(result => {
            this.postList = result;
            const postIds = result.map(element => element.id);
            console.log(postIds); 
           postIds.forEach(element => {
             this.showMessageById(element);

           })
        },
        error => {
          console.log(error);
        });
  }

  showMessageById(postId: number) {
    return this.postService.getAllMessagesByPost(this.topic_id, postId)
        .subscribe(result => {
              const postIndex = this.postList.findIndex(element => element.id === postId);
              this.postList[postIndex].message = result;
          },
          error => {
            console.log(error);
          });
    }

  createPost(){
    var post = new Post({"text": this.postText, "title": this.postTitle});
    this.postService.postPost(this.topic_id, post).subscribe(
      data => {this.postList.push(data)
        console.log(data)
      },
      err => {
        console.log(err)}
    );
    this.printPostForm = false;  
  }

  createMessage(){
    var message = new Message({"text": this.messageName, "post" : this.post_id});
    this.postService.postMessage(this.topic_id, this.post_id, message).subscribe(
      data => this.messageList.push(data),
      err => console.log(err)
    );
    this.printPostForm = false;    
  }

}
