
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase6Component } from './fase-6.component';

const routes: Routes = [{ path: '', component: Fase6Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Fase6RoutingModule {}

