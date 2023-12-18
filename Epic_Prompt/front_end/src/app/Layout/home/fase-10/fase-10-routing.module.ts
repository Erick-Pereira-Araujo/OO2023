import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase10Component } from './fase-10.component';


const routes: Routes = [
  {path : '', component: Fase10Component},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fase10RoutingModule { }
