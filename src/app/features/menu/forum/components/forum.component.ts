import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/features/authentication/login/core/login.service';
import { HomeStorageService } from '../../home/core/home-storage.service';
import { Topic } from '../topic.model';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  topicList: Topic[];
  printTopicForm = false;
  printPostForm = false;
  topicName: string;
  postName: string;
  addTopic:number;
  searchForm : FormGroup;
  errorInForm : boolean;
  constructor(private topicService: TopicService,private router:Router,
      private homeStorageService: HomeStorageService) {
        this.showTopic();
       }

  ngOnInit(): void {
    this.printTopicForm;
  }

  printTopicToTrue(){
    this.printTopicForm = true;
    var element = document.getElementById("inputPlus");
    element.classList.add("afterClick");
  }

  printSubject(id:number) {
    this.addTopic=id;
     this.printPostForm = true;
   }

   createTopic(){
    var topic = new Topic({"label": this.topicName});
    this.topicService.postTopic(topic).subscribe(
      data =>{ this.topicList.push(data) },
      err => {
        console.log(err)
      }
    );
    this.printTopicForm = false;   
    var element = document.getElementById("inputPlus");
    element.classList.remove("afterClick"); 
  }


  showTopic() {
    return this.topicService.getAllTopics().subscribe( result => {
      this.topicList = result;
      console.log(result);
    }, err => {
      console.log(err)
    })
  }

  // btnClick () {

  //   if (!!this.searchForm.get('posts').value) {
  //     this.errorInForm = false;
  //     this.homeStorageService.setTownship(this.searchForm.get('posts').value);
  //     this.router.navigate(['/posts', {township: this.searchForm.get('posts').value}]);
  //   } else {
  //     this.errorInForm = true;
  //   }
    
  
    
}
