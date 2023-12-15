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
  


  cadastrar() {
    if (this.cadastrarForm?.invalid) {
      return;
    }

    this.jogadorController.createJogador(this.cadastrarForm?.value)
      .pipe(
        tap((result) => {
          if (result === null) {
            this.snackbarService.openSnackBar('Já existe um jogador com esse nome, favor escolha outro', 'Entendi')
            throw new Error('Retorno do backend é null');
          } else {
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
