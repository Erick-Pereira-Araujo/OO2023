import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorController } from '../../../Shared/Controllers/jogador.controller';
import { HeroiController } from '../../../Shared/Controllers/heroi.controller';
import { VilaoController } from '../../../Shared/Controllers/vilao.controller';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { LogAcoes } from '../../../Shared/Models/LogAcoes';
import { catchError, interval, mergeMap, of, takeWhile } from 'rxjs';

@Component({
  selector: 'app-fase-5',
  templateUrl: './fase-5/fase-5.component.html',
  styleUrls: ['./fase-5/fase-5.component.css'],
})
export class Fase5Component implements OnInit {

  private static readonly VIDA_VILAO_FASE_5 = 190;
  private static readonly ATAQUE_VILAO_FASE_5 = 32;
  private static readonly DEFESA_VILAO_FASE_5 = 32;
  private static readonly XP_DROP_VILAO_FASE_5 = 50;
  private static readonly PORCENTAGEM_ATIVACAO_ATAQUE_ESPECIAL = 30; // 30% de vida

  private static readonly DANO_VENENO_OCULTO = 10; // Dano ao longo do tempo por envenenamento
  private static readonly DURACAO_VENENO_OCULTO = 3; // Número de turnos que o envenenamento dura

  logAcoes: LogAcoes[] = [];
  heroiEnvenenado: boolean = false;
  idJogador: any;
  route: any;
  marcadorDanoReduzido: number;
  vidaAtualVilao: number;
  vilao: any;
  vidaAtualHeroi: number;
  heroi: any;
  marcadorEnvenenamento: number;
 
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idJogador = params['idJogador'];
    });
    this.carregaJogador();
    this.carregaVilao();
    this.calcularPorcentagemVida(1);
    this.calcularPorcentagemVida(2);
    this.marcadorDanoReduzido = 0;
    this.verificaAtaque();
  }
  verificaAtaque() {
    throw new Error('Method not implemented.');
  }
  calcularPorcentagemVida(arg0: number) {
    throw new Error('Method not implemented.');
  }
  carregaJogador() {
    throw new Error('Method not implemented.');
  }
  carregaVilao() {
    throw new Error('Method not implemented.');
  }

  // ... (seu código existente)

  vilaoRelizaAcao() {
    if (this.vidaAtualVilao <= Fase5Component.VIDA_VILAO_FASE_5 * (Fase5Component.PORCENTAGEM_ATIVACAO_ATAQUE_ESPECIAL / 100) && this.marcadorDanoReduzido === 0) {
      // ataque epecial 
      this.marcadorDanoReduzido = Fase5Component.DURACAO_VENENO_OCULTO;
      this.heroiEnvenenado = true; // veneno no herói
      return -1;
    } else {
      return 1
    }
  }
  
  heroiAtaca() {
    let log: LogAcoes;
    let acaoVilao = this.vilaoRelizaAcao();
    let ataqueTemp: number;
  
    if (this.marcadorDanoReduzido > 0) {
      ataqueTemp = this.heroi.ataque * 0.8;
      this.marcadorDanoReduzido--;
    } else {
      ataqueTemp = this.heroi.ataque;
    }
  
    if (acaoVilao == 0) {
      // Vilão ataca
      if (this.vilao.ataque - this.heroi.defesa > 0) {
        this.vidaAtualHeroi -= this.vilao.ataque - this.heroi.defesa;
      }
  
      if (ataqueTemp - this.vilao.defesa > 0) {
        this.vidaAtualVilao -= ataqueTemp - this.vilao.defesa;
      }
  
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Atacou'
      };
    } else if (acaoVilao == 1) {
      // defesa
      if (ataqueTemp - this.vilao.defesa * 2 > 0) {
        this.vidaAtualVilao -= ataqueTemp - this.vilao.defesa * 2;
      }
  
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Defendeu'
      };
    } else {
      // ataque especial
      if (ataqueTemp - this.vilao.defesa > 0) {
        this.vidaAtualVilao -= ataqueTemp - this.vilao.defesa;
      }
  
      // veneno oculto
      this.aplicarVenenoOculto();
  
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Usou Ataque Especial (Veneno Oculto)'
      };
    }
  
    this.logAcoes.push(log);
    this.verificaFimLuta();
  }
  
  aplicarVenenoOculto() {
    
    this.marcadorEnvenenamento = 3; 
  }
  
  verificaFimLuta() {
    throw new Error('Method not implemented.');
  }

  heroiDefende() {
    let log: LogAcoes;
    let acaoVilao = this.vilaoRelizaAcao();

    if (acaoVilao == 0) {
      if (this.vilao.ataque - this.heroi.defesa > 0) {
        this.vidaAtualHeroi -= this.vilao.ataque - this.heroi.defesa;
      }
      log = {
        acaoHeroi: 'Defendeu',
        acaoVilao: 'Atacou',
      };
    } else if (acaoVilao == 1) {
      log = {
        acaoHeroi: 'Defendeu',
        acaoVilao: 'Defendeu',
      };
    } else {
      if (this.vilao.ataqueEspecial === 'Veneno Oculto') {
        // Adicione o efeito de veneno ao herói
        this.aplicarEfeitoVeneno();
      }

      log = {
        acaoHeroi: 'Defendeu',
        acaoVilao: 'usou Ataque Especial',
      };
    }

    if (this.marcadorDanoReduzido > 0) {
      this.marcadorDanoReduzido--;
    }

    this.logAcoes.push(log);
    this.verificaFimLuta();
  }

  aplicarEfeitoVeneno() {
    const taxaDanoVeneno = 10;
    let duracaoVenenoSegundos = 5;

    this.heroiEnvenenado = true;

    interval(1000)
      .pipe(takeWhile(() => duracaoVenenoSegundos > 0 && this.vidaAtualHeroi > 0))
      .subscribe(() => {
        this.vidaAtualHeroi -= taxaDanoVeneno;
        duracaoVenenoSegundos--;

        if (this.vidaAtualHeroi <= 0) {
          this.heroiEnvenenado = false; 
        }
        this.verificaFimLuta();
      });
    }
  }
