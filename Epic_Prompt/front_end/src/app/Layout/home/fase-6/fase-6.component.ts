
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fase-6',
  templateUrl: './fase-6/fase-6.component.html',
  styleUrls: ['./fase-6/fase-6.component.css'],
})
export class Fase6Component implements OnInit {

  private static readonly VIDA_VILAO_FASE_6 = 210;
  private static readonly ATAQUE_VILAO_FASE_6 = 40;
  private static readonly DEFESA_VILAO_FASE_6 = 26;
  private static readonly XP_DROP_VILAO_FASE_6 = 50;
  private static readonly PORCENTAGEM_ATIVACAO_ATAQUE_ESPECIAL = 25; // 30% de vida

  private static readonly DANO_CHOQUE = 15; // Dano ao longo do tempo por envenenamento
  private static readonly DURACAO_CHOQUE = 3; // Número de turnos que o envenenamento dura
  //constructor(
    //private router : Router,
    //private route: ActivatedRoute,
    //private jogadorController: JogadorController,
    //private heroiController: HeroiController,
    //private vilaoController: VilaoController,
    //private snackbarService: SnackbarService,
  //){}

  
  //idJogador: any;
  //heroi: any;
  //vilao: any;
  //vidaAtualHeroi: any;
  //vidaMaximaHeroi: any;
  //vidaAtualVilao: any;
  //vidaMaximaVilao: any;
  //logAcoes: LogAcoes[] = [];
  //marcadorEscudo: any;

  //ngOnInit(): void {
   // this.route.params.subscribe(params => {
      //this.idJogador = params['idJogador'];
    //});
    //this.carregaJogador();
    //this.carregaVilao();
//    this.calcularPorcentagemVida(1);
//    this.calcularPorcentagemVida(2);
    //this.marcadorEscudo = 0;
  //  this.verificaAtaque();
//  }

  heroiEletrocutado: boolean = false;
  idJogador: any;
  route: any;
  marcadorDanoReduzido: number;
  vidaAtualVilao: number;
  vilao: any;
  vidaAtualHeroi: number;
  heroiParalisado: boolean;
  heroi: any;
  logAcoes: any;

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
  calcularPorcentagemVida(arg0: number) {
    throw new Error('Method not implemented.');
  }
  carregaVilao() {
    throw new Error('Method not implemented.');
  }
  carregaJogador() {
    throw new Error('Method not implemented.');
  }

  verificaAtaque() {
    if (this.vidaAtualVilao <= Fase6Component.VIDA_VILAO_FASE_6 * (Fase6Component.PORCENTAGEM_ATIVACAO_ATAQUE_ESPECIAL / 100) && this.marcadorDanoReduzido === 0) {
      //ataque especial
      this.marcadorDanoReduzido = 1;  // duração desejada 
      this.heroiParalisado = true;
      console.log('Vilão realiza ataque especial (Paralisia)');
    } else {
      console.log('Vilão realiza ação normal');
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
  
    // Verifica se o herói está paralisado e aplica o dano 
    if (this.heroiEletrocutado) {
      const DANO_CHOQUE = 10; // 
      this.vidaAtualHeroi -= DANO_CHOQUE;
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Tomou Dano por Eletrocutado'
      };
    } else {
      // Lógica para o ataque normal do herói
      // ... (seu código existente para calcular o dano ao vilão)
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Atacou'
      };
    }
  
    this.logAcoes.push(log);
    this.verificaFimLuta();
  }
  vilaoRelizaAcao() {
    throw new Error('Method not implemented.');
  }
  verificaFimLuta() {
    throw new Error('Method not implemented.');
  }

  heroiDefende() {
    let log: LogAcoes;
    let acaoVilao = this.vilaoRelizaAcao();
  
    // Verifica se o herói levou o ataque especial 
    if (this.heroiParalisado) {
      console.log('Herói está paralisado e não pode se defender neste turno.');
      log = {
        acaoHeroi: 'Paralisado',
        acaoVilao: 'Ataque de Paralisação'
      };
    } else {

      log = {
        acaoHeroi: 'Defendeu',
        acaoVilao: 'Ataque de Paralisação'
      };
  
      // Verifica o ataque especial 
      if (acaoVilao === -1) {
        this.heroiParalisado = true;
        console.log('Herói foi paralisado pelo ataque especial do vilão.');
      }
    }
  
    if (this.marcadorDanoReduzido > 0) {
      this.marcadorDanoReduzido--;
    }
  
    this.logAcoes.push(log);
    this.verificaFimLuta();
  }
  

}
