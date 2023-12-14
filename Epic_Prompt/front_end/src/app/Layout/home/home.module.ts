import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { Fase1Component } from './fase-1/fase-1.component';
import { Fase2Component } from './fase-2/fase-2.component';
import { Fase3Component } from './fase-3/fase-3.component';
import { Fase4Component } from './fase-4/fase-4.component';



@NgModule({
  declarations: [
    HomeComponent,
    Fase1Component,
    Fase2Component,
    Fase3Component,
    Fase4Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
