import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JogadorController} from '../../Shared/Controllers/jogador.controller'
import { tap } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private router : Router,
    private jogadorController : JogadorController,){ }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      nomeJogador: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  logar() {
    if (this.loginForm?.invalid) {
      return;
    }

    this.jogadorController.loginJogador(this.loginForm?.value)
      .pipe(
        tap((result) => {
          if (result === null) {
            console.log('Usuário não cadastrado: Retorno do backend é null');
            throw new Error('Retorno do backend é null');
          } else {
            console.log('Usuário cadastrado com sucesso');
            this.loginForm?.reset();
            this.router.navigateByUrl('');
          }
        })
      )
      .subscribe(
        
      );
  }

}
