// fase-5-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Fase5Component } from './fase-5.component';

const routes: Routes = [{ path: '', component: Fase5Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Fase5RoutingModule {}

