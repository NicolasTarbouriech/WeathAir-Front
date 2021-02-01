export class Message {
    id? : number;
    date_time : Date;
    text : string;
    postId : number;
   userId?: number;

  constructor(params:any) {
    Object.assign(this, params);
}
}