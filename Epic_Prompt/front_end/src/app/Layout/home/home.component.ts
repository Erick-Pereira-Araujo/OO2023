import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorController } from '../../Shared/Controllers/jogador.controller';
import { SnackbarService } from '../snackbar/snackbar.service';
import { catchError, mergeMap, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor(
    private router : Router,
    private route: ActivatedRoute,
    private jogadorController: JogadorController,
    private snackbarService: SnackbarService,
  ){}

  idJogador: any;
  jogador: any;
  mostrarConteudo: boolean = true;
  
  ngOnInit(): void {
    //aqui pegamos o id do jogador que veio pelo caminho da rota e o atribuimos a variavel
    this.route.params.subscribe(params => {
      this.idJogador = params['idJogador'];
    });
    //aqui carregamos o jogador quando o componente é inicializado
    this.carregaJogador();
  }

  //Função para vericar se o jogador pode ou não entrar no nível
  podeAcessarNivel(nivel: any): boolean{
    //Se o jogador tiver 2 niveis a baixo da fase ele pode entrar
    if(nivel - this.jogador?.heroi?.nivel > 2){
      return this.mostrarConteudo = true;
    }
    //Caso contrário não pode
    return this.mostrarConteudo = false;
  }

  //Carrega o jogador na variavel a ser utilizada neste componente
  carregaJogador(){
    this.jogadorController.getJogador(this.idJogador).pipe(
      mergeMap((res) => {
        //Aqui conseguiu recuperar o jogador corretamente e verifica se o loginstatus dele é true
        //Se for true atribui o valor de jogador corretamente na variavel
        if (res && res.loginStatus === true) {
          this.jogador = res;
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

  //Função para realizar o logout
  logout(){
    this.jogadorController.logoutJogador(this.jogador).subscribe(res => {
      if(res == null){
        this.router.navigateByUrl('/login');
        this.snackbarService.openSnackBar('Logout feito com sucesso', 'Entendi')
      }else{
        this.snackbarService.openSnackBar('Falha ao deslogar', 'Entendi')
      }
    })
  }

}
