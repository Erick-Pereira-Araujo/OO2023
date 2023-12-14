import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase4Component } from './fase-4.component';


const routes: Routes = [
  {path : '', component: Fase4Component},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fase4RoutingModule { }
