// fase-5.module.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fase5Component } from './fase-5.component';
import { Fase5RoutingModule } from './fase-5-routing.module';

@NgModule({
  declarations: [Fase5Component],
  imports: [CommonModule, Fase5RoutingModule],
})
export class Fase5Module {}
