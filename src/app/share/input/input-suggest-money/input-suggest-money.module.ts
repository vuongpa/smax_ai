import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSuggestMoneyComponent } from './input-suggest-money.component';
import { NgxCurrencyModule } from 'ngx-currency';



@NgModule({
  declarations: [
    InputSuggestMoneyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxCurrencyModule
  ],
  exports: [
    InputSuggestMoneyComponent
  ]
})
export class InputSuggestMoneyModule { }
