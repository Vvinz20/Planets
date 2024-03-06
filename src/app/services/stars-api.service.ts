import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planet } from '../models/planet-model';

@Injectable({
  providedIn: 'root'
})
export class PlanetService {
  private apiUrl = 'https://swapi.dev/api/planets/?page=';

  constructor(private http: HttpClient) { }

  getPlanets(pageNumber:number): Observable<any> {
    return this.http.get<any>(this.apiUrl + pageNumber);
  }

  getResidents(residentUrls: string[]): Observable<any>[] {
    return residentUrls.map(url => this.http.get<any>(url));
  }
}
