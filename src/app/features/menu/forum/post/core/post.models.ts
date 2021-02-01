import { Message } from "./message.models";

export class Post {
    id?: number;
    date_time : Date;
    text : string;
    title : string;
    topicId : number;
    message : Message[];
    userId?: number;

  constructor(params:any) {
    Object.assign(this, params);
}


}