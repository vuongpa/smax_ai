import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputMaskComponent } from './input-mask.component';
import { NgxMaskModule } from 'ngx-mask'
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InputMaskComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    InputMaskComponent
  ]
})
export class InputMaskModule { }
