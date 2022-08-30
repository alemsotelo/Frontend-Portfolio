import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HysComponent } from '../components/hys/hys.component';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  URL = 'https://backendams1.herokuapp.com/educacion/';
  

  constructor(private http: HttpClient) { }
  public get(): Observable<HysComponent[]>{
    console.log("El servicio skills esta corriendo");
    return this.http.get<HysComponent[]>(this.URL + 'lista');
  }

  public detail(id: number): Observable<HysComponent>{
    return this.http.get<HysComponent>(this.URL + `detail/${id}`);
  } 

  public save(skills: HysComponent): Observable<any>{
    return this.http.post<any>(this.URL + 'create', skills);
  }

  public edit(skills: HysComponent): Observable<any>{
    return this.http.put<any>(this.URL + 'update', skills);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete<any>(this.URL + `delete/${id}`);
  }
}
