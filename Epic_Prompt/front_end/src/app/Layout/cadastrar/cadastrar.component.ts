import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JogadorController} from '../../Shared/Controllers/jogador.controller'
import { tap } from 'rxjs';
import { SnackbarService } from '../snackbar/snackbar.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.css'
})
export class CadastrarComponent implements OnInit{

  cadastrarForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder,
    private router : Router,
    private jogadorController : JogadorController,
    private snackbarService: SnackbarService,){ }

  ngOnInit(): void {
    this.cadastrarForm = this._formBuilder.group({
      nomeJogador: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }
  

  //Função para cadastrar o jogador
  cadastrar() {
    //Se o form de cadastro estiver invalido retorna nada
    if (this.cadastrarForm?.invalid) {
      return;
    }

    //Se estiver válido utiliza da função createJogador de jogadorController para mandar os dados do form do front end
    //Para o back end e dessa forma criar o jogador no banco
    this.jogadorController.createJogador(this.cadastrarForm?.value)
      .pipe(
        tap((result) => {

          //Se o retorno do backend for null significa que já existe um jogador com esse nome, logo não cadastra e manda mensagem
          if (result === null) {
            this.snackbarService.openSnackBar('Já existe um jogador com esse nome, favor escolha outro', 'Entendi')
            throw new Error('Retorno do backend é null');
          } else {

            //Caso contrário o jogador é cadastrado e é redirecionado para a página de login.
            this.snackbarService.openSnackBar('Jogador cadastrado com sucesso', 'Entendi')
            this.cadastrarForm?.reset();
            this.router.navigateByUrl('/login');
          }
        })
      )
      .subscribe(
        
      );
  }

}
