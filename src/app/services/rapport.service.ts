import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Rapport} from '../model/rapport';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RapportService {

  url = environment.apiHost;

  constructor(private http: HttpClient,) {

   }

   getRapports(): Observable<Rapport[]> {
    return this.http.get<Rapport[]>(this.url + '/rapports')
    .pipe<Rapport[]>(map((data: any) => data['hydra:member']));
  }

   postRapport(rapport: any): Observable<any> {
    return this.http.post<any>(this.url + '/rapports', rapport);
   }

   getRapport(id: string): Observable<Rapport> {
    return this.http.get<Rapport>(this.url + '/rapports/' + id)
    .pipe<Rapport>(map((data: any) => data));
  }
}
