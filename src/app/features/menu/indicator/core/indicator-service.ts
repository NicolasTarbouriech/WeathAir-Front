import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AirIndicator, MeteoIndicator } from "./indicator.model";

@Injectable({
    providedIn:'root'
})
export class IndicatorService {

    constructor(private http: HttpClient){
    }

    retrieveLatestAirIndicator(township : string): Observable<AirIndicator[]> {
        return this.http.get<AirIndicator[]>(`${environment.api.BASE_URL}airindicators/township=${township}`);
    }

    retrieveMeteoIndicator(township : string): Observable<MeteoIndicator[]> {
        return this.http.get<MeteoIndicator[]>(`${environment.api.BASE_URL}meteoindicators/township=${township}`);
    }

}