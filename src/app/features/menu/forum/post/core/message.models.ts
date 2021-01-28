export class Message {
    id? : number;
    date_time : Date;
    text : string;
    post_id : number;
  //  user_id : number;

  constructor(params:any) {
    Object.assign(this, params);
}
}