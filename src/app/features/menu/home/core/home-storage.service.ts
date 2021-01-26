import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class HomeStorageService {

    public township: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(){}

    public getTownshipStream(): BehaviorSubject<string>{
        return this.township;
    }

    public setTownship(township: string){
        this.township.next(township);
    }

}