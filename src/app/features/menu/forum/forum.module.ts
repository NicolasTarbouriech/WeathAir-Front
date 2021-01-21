import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ForumComponent } from "./components/forum.component";
import { SharedModule } from '../../../shared/shared.module';
import { ForumRoutingModule } from "./forum-routing.module";

@NgModule({
    declarations: [ForumComponent],
    imports: [
      CommonModule,
     ForumRoutingModule, 
     SharedModule
    ]
  })
  export class ForumModule { }