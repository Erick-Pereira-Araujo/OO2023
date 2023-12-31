import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { Fase1Component } from './fase-1/fase-1.component';
import { Fase2Component } from './fase-2/fase-2.component';
import { Fase3Component } from './fase-3/fase-3.component';
import { Fase4Component } from './fase-4/fase-4.component';
import { Fase5Component } from './fase-5/fase-5.component';
import { Fase6Component } from './fase-6/fase-6.component';
import { Fase7Component } from './fase-7/fase-7.component';
import { Fase8Component } from './fase-8/fase-8.component';
import { Fase9Component } from './fase-9/fase-9.component';
import { Fase10Component } from './fase-10/fase-10.component';


const routes: Routes = [
  {path : '', component: HomeComponent},
  {path : 'fase-1', component: Fase1Component},
  {path : 'fase-2', component: Fase2Component},
  {path : 'fase-3', component: Fase3Component},
  {path : 'fase-4', component: Fase4Component},
  {path : 'fase-5', component: Fase5Component},
  {path : 'fase-6', component: Fase6Component},
  {path : 'fase-7', component: Fase7Component},
  {path : 'fase-8', component: Fase8Component},
  {path : 'fase-9', component: Fase9Component},
  {path : 'fase-10', component: Fase10Component},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
