import { Jogador } from '../Models/Jogador';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogadorController {

  urlBase = environment.BASE_URL;

  constructor(public http: HttpClient) { }

  createJogador(obj: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(`${this.urlBase}auth/cadastrar`, obj)
  }

  loginJogador(obj: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(`${this.urlBase}auth/login`, obj)
  }

}
