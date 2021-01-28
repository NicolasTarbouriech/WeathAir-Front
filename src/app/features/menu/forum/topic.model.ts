import { Post } from "./post/core/Post.models";

export class Topic {

    id?: number;
    label : string;
    posts: Post[];

    constructor(params:any) {
        Object.assign(this, params);
    }
}