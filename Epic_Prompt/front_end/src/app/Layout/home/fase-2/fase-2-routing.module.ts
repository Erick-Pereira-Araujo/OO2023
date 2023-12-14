import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase2Component } from './fase-2.component';


const routes: Routes = [
  {path : '', component: Fase2Component},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Fase2RoutingModule { }
