import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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

  id : number;
  topicId : number;
  topicList: Topic[];
  currentTopic : Topic;
  printTopicForm = false;
  printPostForm = false;
  topicName: string;
  postName: string;
  addTopic:number;
  searchForm : FormGroup;
  errorInForm : boolean;

  constructor(private topicService: TopicService,private router:Router,
    private route: ActivatedRoute,
      private homeStorageService: HomeStorageService) {
        this.showTopic();
       }

  ngOnInit(): void {
    this.printTopicForm;
  }

  printTopicToTrue(){
    this.printTopicForm = true;
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
  }

  showTopic() {
    return this.topicService.getAllTopics().subscribe( result => {
      this.topicList = result;
      console.log(result);
    }, err => {
      console.log(err)
    })
  }

  // deleteTopic(topic : Topic) {
  //   this.topicService.deleteTopic(topic.id).subscribe(
  //    data => {
  //     const topicIndex = this.topicList.findIndex(element => element.id === topic.id);
 
  //    })
    
  // }

}
