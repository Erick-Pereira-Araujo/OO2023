import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorController } from '../../../Shared/Controllers/jogador.controller';
import { SnackbarService } from '../../snackbar/snackbar.service';

@Component({
  selector: 'app-fase-1',
  templateUrl: './fase-1.component.html',
  styleUrl: './fase-1.component.css'
})
export class Fase1Component implements OnInit{

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private jogadorController: JogadorController,
    private snackbarService: SnackbarService,
  ){}

  idJogador: any;
  jogador: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idJogador = params['idJogador'];
    });
    this.carregaJogador();
    this.calcularPorcentagemVida();
    console.log(this.jogador)
  }

  carregaJogador(){
    this.jogadorController.getJogador(this.idJogador).subscribe(res => {
        this.jogador = res;
    })
  }

  calcularPorcentagemVida(): number {
    const vidaAtual = this.jogador?.heroi?.vida ?? 0; // Se jogador ou heroi não estiver definido, define vidaAtual como 0
    const vidaMaxima = 100; // Supondo vida máxima como 100

    return (vidaAtual / vidaMaxima) * 100; // Calcula a porcentagem
  }

}
