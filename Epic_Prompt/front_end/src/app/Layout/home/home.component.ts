import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JogadorController } from '../../Shared/Controllers/jogador.controller';
import { SnackbarService } from '../snackbar/snackbar.service';

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
    this.route.params.subscribe(params => {
      this.idJogador = params['idJogador'];
    });
    this.carregaJogador();
  }

  podeAcessarNivel(nivel: any): boolean{
    if(nivel - this.jogador?.heroi?.nivel > 2){
      return this.mostrarConteudo = true;
    }
    return this.mostrarConteudo = false;
  }

  carregaJogador(){
    this.jogadorController.getJogador(this.idJogador).subscribe(res => {
      if(res.loginStatus == true){
        this.jogador = res;
      }else{
        this.router.navigateByUrl('/login');
        this.snackbarService.openSnackBar('Você deve logar primeiro antes de acessar a página de jogador', 'Entendi')
      }
    })
  }

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
