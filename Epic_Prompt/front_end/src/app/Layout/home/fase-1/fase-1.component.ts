import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorController } from '../../../Shared/Controllers/jogador.controller';
import { SnackbarService } from '../../snackbar/snackbar.service';
import { VilaoController } from '../../../Shared/Controllers/vilao.controller';
import { catchError, mergeMap, of } from 'rxjs';
import { LogAcoes } from '../../../Shared/Models/LogAcoes';
import { HeroiController } from '../../../Shared/Controllers/heroi.controller';

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
  marcadorDanoReduzido: any;
  danoReduzido: boolean = true;

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

  //Carrega o jogador na variavel a ser utilizada neste componente
  carregaJogador(){
    this.jogadorController.getJogador(this.idJogador).pipe(
      mergeMap((res) => {
        //Aqui conseguiu recuperar o jogador corretamente e verifica se o loginstatus dele é true
        //Se for true atribui o valor de jogador corretamente na variavel
        if (res && res.loginStatus === true) {
          this.heroi = res.heroi;
          this.vidaAtualHeroi = this.heroi?.vida;
          this.vidaMaximaHeroi = this.heroi?.vida;
          return of(true);
        } else {
          //Se for false significa que esse jogador não logou ainda e apenas digitou o caminho direto e evitou login.
          //Logo ele é redirecionado a pagina de login para fazer o login.
          this.router.navigateByUrl('/login');
          this.snackbarService.openSnackBar('Você deve logar primeiro antes de acessar a página de jogador', 'Entendi');
          return of(false);
        }
      }),
      //Se teve erro significa que o jogador de ID mencionando não exite no banco
      //Logo é redirecionado para a página de cadastro para se cadastrar
      catchError((error) => {
        this.router.navigateByUrl('/cadastrar');
        this.snackbarService.openSnackBar('Jogador não cadastrado, favor cadastre-se para jogar', 'Entendi');
        return of(false);
      })
    ).subscribe((result) => {
    });
  }
  //Aqui carregamos o vilão de id 1 para a fase-1
  carregaVilao(){
    this.vilaoController.getVilao(1).subscribe(res => {
      this.vilao = res;
      this.vidaAtualVilao = this.vilao.vida;
      this.vidaMaximaVilao = this.vilao.vida;
    })
  }

  //Função para calcular as porcentagens de vida do vião e do heroi
  //Utilizada para definir o tamanho da barra de vida deles no html
  calcularPorcentagemVida( tipo: number): number {
    if(tipo == 1){
      return (this.vidaAtualHeroi / this.vidaMaximaHeroi) * 100;
    }
    return (this.vidaAtualVilao / this.vidaMaximaVilao) * 100;
  } 

  //Caso o heroi opte por atacar essa função gerencia os proximos passos
  heroiAtaca(){
    //Variavel local apenas para ver qual foram as ações do heroi e do vilão no turno em questão
    let log: LogAcoes;

    //Ação realizada pelo vilão definida pela função vilaoRealizaAcao()
    let acaoVilao = this.vilaoRelizaAcao();

    //Variavel que define o valor de ataque o heroi
    //Utilizada pois nessa fase o vilão reduz temporariamente o ataque do heroi
    let ataqueTemp: number;

    //Se o marcadorDanoReduzido for maior que zero significa que ainda está em turnos onde o ataque do herói está reduzido.
    if(this.marcadorDanoReduzido > 0){
      //Logo define que o ataque do heroi equivale a 80% do que deveria ser, pois o vilão reduz o ataque em 20%
      ataqueTemp = this.heroi.ataque * 0.8;
      //reduz o marcador para avisar que um turno se passou
      this.marcadorDanoReduzido--;
    }else{
      //caso contrário o ataque temporário é igual ao ataque do heroi
      ataqueTemp = this.heroi.ataque;
    }

    //Aqui trata quando o vilão atacou
    if(acaoVilao == 0){
      //Essas lógicas servem para tratar quando o jogador de nivel muito mais alto que o vilão e o heroi não se cure
      if(this.vilao.ataque - this.heroi.defesa > 0){
        this.vidaAtualHeroi -= (this.vilao.ataque - this.heroi.defesa);
      }
      if(ataqueTemp - this.vilao.defesa > 0){
        this.vidaAtualVilao -= (ataqueTemp - this.vilao.defesa);
      }
      //Aqui define qual foi a ação de cada um no turno
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Atacou'
      };
    }else if(acaoVilao == 1){
      //Aqui o vilão defende
      //Essas lógicas servem para tratar quando o jogador de nivel muito mais alto que o vilão e o heroi não se cure
      if(ataqueTemp - (this.vilao.defesa)*2 > 0){
        this.vidaAtualVilao -= (ataqueTemp - (this.vilao.defesa*2));
      }
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'Defendeu'
      };
    }else{
      //Aqui o vilão utiliza ataque especial
      //Essas lógicas servem para tratar quando o jogador de nivel muito mais alto que o vilão e o heroi não se cure
      if(ataqueTemp - this.vilao.defesa){
        this.vidaAtualVilao -= (ataqueTemp - this.vilao.defesa);
      }
      log = {
        acaoHeroi: 'Atacou',
        acaoVilao: 'usou Ataque Especial'
      };
    }
    //Adiciona o log local ao array de logs
    this.logAcoes.push(log);

    //Verifica se a luta chegou ao fim ou não
    this.verificaFimLuta();
  }

  heroiDefende(){
    let log: LogAcoes;
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
    if(this.marcadorDanoReduzido > 0){
      this.marcadorDanoReduzido--;
    }
    this.logAcoes.push(log);
    this.verificaFimLuta();
  }

  vilaoRelizaAcao(){
    if(this.vidaAtualVilao <= this.vilao.vida * 0.3 && this.marcadorDanoReduzido == 0){
      //Vilão realiza ataque especial
      this.marcadorDanoReduzido = 4;
      return -1;

    }else{
      //Vilão realiza ação normal
      const randomNumber = Math.floor(Math.random() * 2);
      if (randomNumber === 0 || this.marcadorDanoReduzido > 0) {
        //vilão ataca
        return 0;
      } else {
        //vilão defende
        return 1;
      }
    }
  }

  verificaAtaque(){
    if(this.marcadorDanoReduzido==0){
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
          this.snackbarService.openSnackBar('Parabéns, você ganhou sua batalha e ganhou expêriencia para avançar em sua jornada', 'Entendi')
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
