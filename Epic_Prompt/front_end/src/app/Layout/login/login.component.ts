import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorController} from '../../Shared/Controllers/jogador.controller'
import { tap } from 'rxjs';
import { SnackbarService } from '../snackbar/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  //variavel do formulário
  loginForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private router : Router,
    private jogadorController : JogadorController,
    private snackbarService: SnackbarService,){ }

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      nomeJogador: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

  //Função de logar
  logar() {
    //Se o formulário estiver invalido ele retorna nada
    if (this.loginForm?.invalid) {
      return;
    }

    //Se estiver vádido chama variavel jogadorcController da Classe controladora do jogador
    //A função loginJogador serve para justamente logar o jogador.
    this.jogadorController.loginJogador(this.loginForm?.value)
      .pipe(
        tap((result) => {
          //Se o retorno do backend for null significa que o jogador não está cadastrado.
          if (result === null) {
            this.snackbarService.openSnackBar('Jogador não cadastrado, favor cadastre-se', 'Entendi')
            throw new Error('Retorno do backend é null');
          } else {

            //Caso contrário pega o id do jogador e passa para a variavel 
            var idJogador = result;

            //Mensagem de login de sucesso
            this.snackbarService.openSnackBar('Jogador logado com sucesso', 'Entendi')
            this.loginForm?.reset();

            //Navega para a home page e passa o id do Jogador pela caminho para ser recuperado no componente home
            this.router.navigate(['/home', idJogador]);
          }
        })
      )
      .subscribe(
        
      );
  }

}
