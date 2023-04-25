import { Pipe, PipeTransform } from '@angular/core';
// import { formatCurrency, getCurrencySymbol } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
// import { takeUntil } from 'rxjs/operators';
@Pipe({ name: 'mycurrency' })
export class MycurrencyPipe implements PipeTransform {
  // destroy = new Subject();
  currencyCodeDefault = 'VND';
  symbol = 'đ';
  constructor(
    private currencyPipe: CurrencyPipe
  ) {

    // this.shopService.currentShop.pipe(takeUntil(this.destroy)).subscribe(shop => {
    //   if (shop) {
    //     // this.currencyCodeDefault = shop.locate.currency || 'VND';
    //     this.currencyCodeDefault = shop.locate.currency || 'VND';
    //     switch (this.currencyCodeDefault) {
    //       case 'VND':
    //         this.symbol = 'đ';
    //         break;
    //       case 'USD':
    //         this.symbol = '$';
    //         break;
    //       case 'EUR':
    //         this.symbol = '€';
    //         break;
    //       case 'THB':
    //         this.symbol = '฿';
    //         break;
    //       case 'JPY':
    //         this.symbol = '¥';
    //         break;
    //       case 'PHP':
    //         this.symbol = '₱';
    //         break;
    //     }
    //   }
    // });
  }

  // ngOnDestroy(): void {
  //   // Called once, before the instance is destroyed.
  //   // Add 'implements OnDestroy' to the class.
  //   this.destroy.next(true);
  //   this.destroy.complete();
  // }
  transform(
    value: number,
    currencyCode: string = this.currencyCodeDefault
  ): string | null {
    return this.currencyPipe.transform(value, currencyCode, '') + this.symbol;
  }
}
