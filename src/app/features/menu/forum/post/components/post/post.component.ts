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
  postName : string;
  postTitle : string;
  idTopic : number;

  constructor(private postService: PostService, 
    private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.printPostForm;
    this.idTopic = parseInt(this.route.snapshot.paramMap.get("id"));
    console.log(this.idTopic);

    this.postService.getPostById(this.idTopic).subscribe( result => {
      this.postList = result;
      console.log(result);
    }, err => {
      console.log(err)
    })
  }

  printPostToTrue(){
    this.printPostForm = true;
  }

  createPost(){
    var post = new Post({"text": this.postName, "title": this.postTitle});
    this.postService.postPost(post).subscribe(
      // data => this.topicList.push(data),
      err => console.log(err)
    );
  }

  createMessage(){
    var message = new Message({"text": this.messageName});
    this.postService.postMessage(message).subscribe(
      // data => this.topicList.push(data),
      err => console.log(err)
    );
    this.printPostForm = false;    
  }

}
