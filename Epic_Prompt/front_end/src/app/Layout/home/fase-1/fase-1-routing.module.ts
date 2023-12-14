import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase1Component } from './fase-1.component';


const routes: Routes = [
  {path : '', component: Fase1Component},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fase1RoutingModule { }
