import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ENV_VARIABLES } from '../constants/classes/env-variables';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = ENV_VARIABLES.API_URL

  constructor(private http: HttpClient) { }

  get(endPoints: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + endPoints)
  }

  post(endPoints: string, body: Object): Observable<any> {
    return this.http.post<any>(this.apiUrl + endPoints, JSON.stringify(body))
  }

  delete(endPoints: string): Observable<any> {
    return this.http.delete<any>(this.apiUrl + endPoints)
  }

  put(endPoints: string, body: Object): Observable<any> {
    return this.http.put<any>(this.apiUrl + endPoints, JSON.stringify(body))
  }
}
