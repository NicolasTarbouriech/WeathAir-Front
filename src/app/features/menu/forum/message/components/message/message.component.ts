import { Component, OnInit } from '@angular/core';
import { Message } from '../../core/message.models';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  messageList: Message[];
  printMessageForm = false;
  messageName : string;

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
  }

  printMessageToTrue(){
    this.printMessageForm = true;
  }

  createMessage(){
    var message = new Message({"text": this.messageName});
    this.messageService.postMessage(message).subscribe(
      // data => this.topicList.push(data),
      err => console.log(err)
    );
    this.printMessageForm = false;    
  }
}
