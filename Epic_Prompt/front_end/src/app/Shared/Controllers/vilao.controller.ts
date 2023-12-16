import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { Vilao } from '../Models/Vilao';

@Injectable({
  providedIn: 'root'
})
export class VilaoController {

  urlBase = environment.BASE_URL;

  constructor(public http: HttpClient) { }

  getVilao(id: number): Observable<Vilao> {
    return this.http.get<Vilao>(`${this.urlBase}vilao/${id}`)
  }

}
