import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorController } from '../../../Shared/Controllers/jogador.controller';
import { HeroiController } from '../../../Shared/Controllers/heroi.controller';
import { VilaoController } from '../../../Shared/Controllers/vilao.controller';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { LogAcoes } from '../../../Shared/Models/LogAcoes';
import { catchError, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-fase-2',
  templateUrl: './fase-2.component.html',
  styleUrl: './fase-2.component.css'
})
export class Fase2Component implements OnInit{

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private jogadorController: JogadorController,
    private heroiController: HeroiController,
    private vilaoController: VilaoController,
    private snackbarService: SnackbarService,
  ){}

  
  idJogador: any;
  heroi: any;
  vilao: any;
  vidaAtualHeroi: any;
  vidaMaximaHeroi: any;
  vidaAtualVilao: any;
  vidaMaximaVilao: any;
  logAcoes: LogAcoes[] = [];
  marcadorQueimadura: any;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idJogador = params['idJogador'];
    });
    this.carregaJogador();
    this.carregaVilao();
    this.calcularPorcentagemVida(1);
    this.calcularPorcentagemVida(2);
    this.marcadorQueimadura = 0;
    this.verificaAtaque();
  }

  carregaJogador(){
    this.jogadorController.getJogador(this.idJogador).pipe(
      mergeMap((res) => {
        if (res && res.loginStatus === true) {
          this.heroi = res.heroi;
          this.vidaAtualHeroi = this.heroi?.vida;
          this.vidaMaximaHeroi = this.heroi?.vida;
          return of(true);
        } else {
          this.router.navigateByUrl('/login');
          this.snackbarService.openSnackBar('Você deve logar primeiro antes de acessar a página de jogador', 'Entendi');
          return of(false);
        }
      }),
      catchError((error) => {
        this.router.navigateByUrl('/cadastrar');
        this.snackbarService.openSnackBar('Jogador não cadastrado, favor cadastre-se para jogar', 'Entendi');
        return of(false);
      })
    ).subscribe((result) => {
    });
  }

  carregaVilao(){
    this.vilaoController.getVilao(2).subscribe(res => {
      this.vilao = res;
      this.vidaAtualVilao = this.vilao.vida;
      this.vidaMaximaVilao = this.vilao.vida;
    })
  }

  calcularPorcentagemVida( tipo: number): number {
    if(tipo == 1){
      return (this.vidaAtualHeroi / this.vidaMaximaHeroi) * 100;
    }
    return (this.vidaAtualVilao / this.vidaMaximaVilao) * 100;
  }

  heroiAtaca(){
    let log: LogAcoes;
    if(this.marcadorQueimadura > 0){
      this.vidaAtualHeroi -= 10;
      this.marcadorQueimadura--;
    }
    let acaoVilao = this.vilaoRelizaAcao();
    if(acaoVilao == 0){
      if(this.vilao.ataque - this.heroi.defesa>0){
        this.vidaAtualHeroi -= (this.vilao.ataque - this.heroi.defesa);
      }
      if(this.heroi.ataque - this.vilao.defesa){
        this.vidaAtualVilao -= (this.heroi.ataque - this.vilao.defesa);
      }
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Atacou'
      };
    }else if(acaoVilao == 1){
      if(this.heroi.ataque - (this.vilao.defesa)*2 > 0){
        this.vidaAtualVilao -= (this.heroi.ataque - (this.vilao.defesa*2));
      }
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Defendeu'
      };
    }else{
      if(this.heroi.ataque - this.vilao.defesa){
        this.vidaAtualVilao -= (this.heroi.ataque - this.vilao.defesa);
      }
      this.vidaAtualHeroi -= 30;
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'usou Ataque Especial'
      };
    }
    this.logAcoes.push(log);
    this.verificaFimLuta();
  }

  heroiDefende(){
    let log: LogAcoes;
    if(this.marcadorQueimadura > 0){
      this.vidaAtualHeroi -= 10;
      this.marcadorQueimadura--;
    }
    let acaoVilao = this.vilaoRelizaAcao();
    if(acaoVilao == 0){
      if(this.vilao.ataque - (this.heroi.defesa*2) > 0){
        this.vidaAtualHeroi -= (this.vilao.ataque - (this.heroi.defesa*2));
      }
      log = {
        acaoHeroi: 'Defendeu',
        acaoVilao: 'Atacou'
      };
    }else if(acaoVilao == 1){
      log = {
        acaoHeroi: 'Defendeu',
        acaoVilao: 'Defendeu'
      };
    }else{
      log = {
        acaoHeroi: 'Defendeu',
        acaoVilao: 'usou Ataque Especial'
      };
    }
    this.logAcoes.push(log);
    this.verificaFimLuta();
  }

  vilaoRelizaAcao(){
    if(this.vidaAtualVilao <= this.vilao.vida * 0.20 && this.marcadorQueimadura == 0){
      //Vilão realiza ataque especial
      this.marcadorQueimadura = 4;
      return -1;

    }else{
      //Vilão realiza ação normal
      const randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber === 0) {
        //vilão ataca
        return 0;
      } else {
        //vilão defende
        return 1;
      }
    }
  }

  verificaAtaque(){
    if(this.marcadorQueimadura==0){
      return true
    }
    return false;
  }
  
  verificaFimLuta(){
    if(this.vidaAtualVilao <= 0){
      if(this.heroi.xpAtual + this.vilao.dropXP >= this.heroi.barraXP){
        this.heroiController.levelUp(this.vilao.dropXP, this.heroi).subscribe(res => {
          this.heroi = res;
          this.router.navigateByUrl(`/home/${this.heroi.id}`);
          this.snackbarService.openSnackBar('Parabéns, você subiu de nível, continue em sua jornada', 'Entendi')
        })
      }else{
        this.heroiController.ganhaXP(this.vilao.dropXP, this.heroi).subscribe(res => {
          this.heroi = res;
          this.router.navigateByUrl(`/home/${this.heroi.id}`);
          this.snackbarService.openSnackBar('Parabéns, você ganhou sua batalha e ganhou expêriencia para avançar em sua jornada', 'Entendi')
        })
      }
    }
    if(this.vidaAtualHeroi <= 0){
      this.router.navigateByUrl(`/home/${this.heroi.id}`);
      this.snackbarService.openSnackBar('Derrota, infelizmente você perdeu a sua batalha contra o vilão', 'Entendi')
    }
  }

}
