import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'cadastrar',
        loadChildren: () => import('./cadastrar/cadastrar.module').then((m) => m.CadastrarModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
      },
      /*{path: '', redirectTo: 'valida-login', pathMatch: 'full'},
  
      {
        path: 'inicio',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
      },
      {
        path: 'valida-login',
        loadChildren: () => import('./valida-login/valida-login.module').then(m => m.ValidaLoginModule)
      },
      {
        path: 'logout',
        loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule)
      },
      {
        path: 'relatorio-necessidade-capacitacao',
        loadChildren: () => import('./relatorio-capacitacao/relatorio-capacitacao.module').then(m => m.RelatorioCapacitacaoModule)
      },
      {
        canActivate : [GestorAutorizationGuard],
        path: 'avaliacao',
        loadChildren: () => import('./avaliacao/avaliacao.module').then((m) => m.AvaliacaoModule)
      },
      {
        canActivate : [AutorizationGuard],
        path: 'processos',
        loadChildren: () => import('./processo/processo.module').then(m => m.ProcessoModule)
      },
      {
        canActivate : [AutorizationGuard],
        path: 'area-conhecimento',
        loadChildren: () => import('./area-conhecimento/area-conhecimento.module').then(m => m.AreaConhecimentoModule)
      },
      {
        canActivate : [AutorizationGuard],
        path: 'macroprocessos',
        loadChildren: () => import('./macroprocess/macroprocess.module').then(m => m.MacroprocessModule)
      },
      {
        canActivate : [AutorizationGuard],
        path: 'cadeias',
        loadChildren: () => import('./cadeia/cadeia.module').then(m => m.CadeiaModule)
      },
      {
        canActivate : [AutorizationGuard],
        path: 'competencias',
        loadChildren: () => import('./competencias/competencias.module').then(m => m.CompetenciasModule)
      },
      {
        canActivate : [AutorizationGuard],
        path: 'vinculo-area-conhecimento',
        loadChildren: () => import('./vinculo-area-conhecimento/vinculo-area-conhecimento.module').then(m => m.VinculoAreaConhecimentoModule)
      },
      {
        path: 'trilha-aprendizagem',
        loadChildren: () => import('./catalogo-trilhas/tela-aprendizagem/tela-aprendizagem.module').then(m => m.TelaAprendizagemModule)
      }
      ,
      {
        path: 'conceito-trilha',
        loadChildren: () => import('./catalogo-trilhas/conceito-trilhas/conceito-trilhas.module').then(m => m.ConceitoTrilhasModule)
      }
      ,
      {
        path: 'vantagens-trilhas',
        loadChildren: () => import('./catalogo-trilhas/vantagens-trilhas/vantagens-trilhas.module').then(m => m.VantagensTrilhasModule)
      }
      ,
      {
        path: 'catalogo-trilhas',
        loadChildren: () => import('./catalogo-trilhas/catalogo-trilhas.module').then(m => m.CatalogoTrilhasModule)
      },
      {
        path: 'categoria',
        loadChildren: () => import('./categoria/categoria.module').then(m => m.CategoriaModule)
      },
      {
        path: 'itens-categoria',
        loadChildren: () => import('./itens-categoria/itens-categoria.module').then(m => m.ItensCategoriaModule)
      }*/
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
