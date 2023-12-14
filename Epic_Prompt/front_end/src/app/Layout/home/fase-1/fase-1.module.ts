import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Fase1Component } from './fase-1.component';
import { Fase1RoutingModule } from './fase-1-routing.module';



@NgModule({
  declarations: [
    Fase1Component
  ],
  imports: [
    CommonModule,
    Fase1RoutingModule
  ]
})
export class Fase1Module { }
