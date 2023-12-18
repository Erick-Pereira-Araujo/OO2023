import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { Fase1Component } from './fase-1/fase-1.component';
import { Fase2Component } from './fase-2/fase-2.component';
import { Fase3Component } from './fase-3/fase-3.component';
import { Fase4Component } from './fase-4/fase-4.component';
import { Fase9Component } from './fase-9/fase-9.component';
import { Fase8Component } from './fase-8/fase-8.component';
import { Fase10Component } from './fase-10/fase-10.component';
import { Fase5Component } from './fase-5/fase-5.component';
import { Fase7Component } from './fase-7/fase-7.component';
import { Fase6Component } from './fase-6/fase-6.component';



@NgModule({
  declarations: [
    HomeComponent,
    Fase1Component,
    Fase2Component,
    Fase3Component,
    Fase4Component,
    Fase5Component,
    Fase6Component,
    Fase7Component,
    Fase8Component,
    Fase9Component,
    Fase10Component
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
