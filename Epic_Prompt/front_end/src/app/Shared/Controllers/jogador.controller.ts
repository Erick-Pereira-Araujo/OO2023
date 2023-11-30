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
    return this.http.post<Jogador>(`${this.urlBase}auth/cadastrar`, obj)
  }

  loginJogador(obj: Jogador): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.urlBase}auth/login`, obj)
  }

}
