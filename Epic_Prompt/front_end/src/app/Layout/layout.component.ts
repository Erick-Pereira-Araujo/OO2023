import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  //serve apenas para esconder o conteúdo html de layout após mudar de página
  mostrarConteudo: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.mostrarConteudo = event.url === '/';
      }
    });
  }

  ngOnInit(): void {
  }

}
