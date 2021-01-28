import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  postName : string;
  postTitle : string;
  topic_id : number;
  post_id : number;
  getPostById : Post [];
  constructor(private postService: PostService, 
    private router:Router, private route: ActivatedRoute) {
      
    }

  ngOnInit(): void {
    this.printPostForm;
    this.topic_id = parseInt(this.route.snapshot.paramMap.get("id"));
    this.post_id = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(this.topic_id);
    console.log(this.post_id);
      this.showPostById();
      this.showMessageById();
  }

  printPostToTrue(){
    this.printPostForm = true;
  }

  showPostById() {
  return this.postService.getAllPostsByTopic(this.topic_id)
      .subscribe(result => {
            this.postList = result;
            console.log(result);
        },
        error => {
          console.log(error);
        });
  }

  showMessageById() {
    return this.postService.getAllMessages(this.topic_id, this.post_id)
        .subscribe(result => {
              this.messageList = result;
              console.log(result);
          },
          error => {
            console.log(error);
          });
    }

  createPost(){
    var post = new Post({"text": this.postName, "title": this.postTitle});
    this.postService.postPost(this.topic_id, post).subscribe(
      // data => this.topicList.push(data),
      err => console.log(err)
    );
  }

  createMessage(){
    var message = new Message({"text": this.messageName});
    this.postService.postMessage(this.topic_id, this.post_id, message).subscribe(
      // data => this.topicList.push(data),
      err => console.log(err)
    );
    this.printPostForm = false;    
  }

}
