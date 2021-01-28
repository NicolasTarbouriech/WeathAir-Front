import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ForumComponent } from "./components/forum.component";
import { SharedModule } from '../../../shared/shared.module';
import { ForumRoutingModule } from "./forum-routing.module";
import { PostComponent } from './post/components/post/post.component';

@NgModule({
    declarations: [ForumComponent, ForumComponent, PostComponent],
    imports: [
      CommonModule,
     ForumRoutingModule, 
     SharedModule
    ]
  })
  export class ForumModule { }