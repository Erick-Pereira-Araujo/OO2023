import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase9Component } from './fase-9.component';


const routes: Routes = [
  {path : '', component: Fase9Component},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fase9RoutingModule { }
