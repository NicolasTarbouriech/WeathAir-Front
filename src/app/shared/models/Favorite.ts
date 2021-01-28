import { ConnectedUser } from "./ConnectedUser";
import { Township } from "./Township";

export class Favorite {
    id?: number;
    duration: string;
    labelIndicator: string; 
    township: Township;

    constructor(params: any) {
        Object.assign(this, params);
    }
}