import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../core/Post.models';
import { PostService } from '../../core/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  printPostForm = false;
  postList: Post[];
  postName : string;
  postTitle : string;
  idPost : number;
  constructor(private postService: PostService,private router:Router) { }

  ngOnInit(): void {
    this.printPostForm;
    this.postService.getAllPosts().subscribe( result => {
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

}
