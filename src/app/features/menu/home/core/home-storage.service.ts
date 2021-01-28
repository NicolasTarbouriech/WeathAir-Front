import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Township } from "src/app/features/authentication/register/core/township.model";
import { environment } from "src/environments/environment";
import { GpsCoordinates } from "../../indicator/core/indicator.model";

@Injectable({
    providedIn:'root'
})
export class HomeStorageService {

    public township: BehaviorSubject<string> = new BehaviorSubject('');

    constructor(private httpClient: HttpClient){}

    public getTownshipStream(): BehaviorSubject<string>{
        return this.township;
    }

    public setTownship(township: string){
        this.township.next(township);
    }

    getTownships() : Observable<Township[]>{
        return this.httpClient.get<Township[]>(`${environment.api.BASE_URL}townships`);
    }

    getGpsCoordinates() : Observable<GpsCoordinates[]> {
        return this.httpClient.get<GpsCoordinates[]>(`${environment.api.BASE_URL}gpscoordinates`);
    } 

}