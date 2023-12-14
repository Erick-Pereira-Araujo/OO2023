import { Jogador } from '../Models/Jogador';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../Models/LoginResponse';

@Injectable({
  providedIn: 'root'
})
export class JogadorController {

  urlBase = environment.BASE_URL;

  constructor(public http: HttpClient) { }

  createJogador(obj: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(`${this.urlBase}cadastrar`, obj)
  }


  loginJogador(jogador: Jogador): Observable<number | null> {
    return this.http.post<number>(`${this.urlBase}login`, jogador);
  }
  

}
