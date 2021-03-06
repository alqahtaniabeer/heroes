import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public get(url: any): Observable<any> {
    return this.http.get(url).pipe(map(res => res));
  }
}