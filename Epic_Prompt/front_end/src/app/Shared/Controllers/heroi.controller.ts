import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from '../../environments/environment';
import { Heroi } from '../Models/Heroi';

@Injectable({
  providedIn: 'root'
})
export class HeroiController {

  urlBase = environment.BASE_URL;

  constructor(public http: HttpClient) { }
    
  levelUp(dropXp: number, obj: Heroi): Observable<Heroi> {
    return this.http.put<Heroi>(`${this.urlBase}heroi/${dropXp}`, obj)
  }

  ganhaXP(dropXp: number, obj: Heroi): Observable<Heroi> {
    return this.http.put<Heroi>(`${this.urlBase}heroi/ganhaXP/${dropXp}`, obj)
  }

}
