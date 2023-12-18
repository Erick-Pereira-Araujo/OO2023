import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase7Component } from './fase-7.component';

const routes: Routes = [{ path: '', component: Fase7Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Fase7RoutingModule {}

