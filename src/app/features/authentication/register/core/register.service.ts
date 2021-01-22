import { api } from './../../../../core/api/api.vars';
import { environment } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  RegisterToken,
  UserInfo,
} from './register.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { share } from 'rxjs/operators';
import { LoginRequest } from '../../login/core/login.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private httpClient: HttpClient) { }

}