import { Message } from "./message.models";

export class Post {
    id?: number;
    date_time : Date;
    text : string;
    title : string;
    topic_id : number;
    message : Message[];
  //  user_id: number;

  constructor(params:any) {
    Object.assign(this, params);
}


}