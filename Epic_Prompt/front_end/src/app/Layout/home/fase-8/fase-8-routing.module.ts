import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase8Component } from './fase-8.component';


const routes: Routes = [
  {path : '', component: Fase8Component},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fase8RoutingModule { }
