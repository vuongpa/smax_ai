import { NgModule } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
// pipe
import { MycurrencyPipe } from './mycurrency.pipe';
@NgModule({
  declarations: [MycurrencyPipe
  ],
  imports: [
  ],
  exports: [
    MycurrencyPipe,
  ],
  providers: [CurrencyPipe]
})
export class MycurrencyModule { }
