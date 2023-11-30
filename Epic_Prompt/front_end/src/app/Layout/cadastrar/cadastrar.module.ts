import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarComponent } from './cadastrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarRoutingModule } from './cadastrar-routing.module';



@NgModule({
  declarations: [
    CadastrarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CadastrarRoutingModule
  ]
})
export class CadastrarModule { }
