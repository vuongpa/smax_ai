import { ObjectAny } from 'src/app/types/viewmodels';
import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MycurrencyPipe } from 'src/app/share/pipe/mycurrency.pipe';
@Component({
  selector: 'app-input-suggest-money',
  templateUrl: './input-suggest-money.component.html',
  styleUrls: ['./input-suggest-money.component.scss'],
  providers: [MycurrencyPipe],
})
export class InputSuggestMoneyComponent implements OnInit {
  @ViewChild('spans') spans: any;
  @Input() disabled: string | null = null;
  @Input() customClass: string = '';
  @Input() optionInputCurrency: ObjectAny = {};
  @Input() amount = 0;
  @Input() listItemSelect: Array<any> = [];
  // @Input() itemValue: String = 'name';    // Phục vụ cho listItemSelect
  // @Input() itemKey: String = 'id';        // listItemSelect
  @Input() itemStyleCenter = true; // Căn giữa item
  @Input() placeholder = '';
  @Input() tagEmpty = 'Thẻ tag rỗng';
  @Input() showInputCreate = true;
  @Input() template: any;
  @Input() suggestMax = 0;
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChange = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onRemove = new EventEmitter<any>();
  showSelectTag = false;
  suggestMoney: ObjectAny[] = [];
  constructor(private mycurrencyPipe: MycurrencyPipe) { }
  ngOnInit(): void { }

  onKeyUpTag({ event }: { event: any }) {
    if (this.amount?.toString().length) {
      setTimeout(() => {
        this.showSelectTag = false;
      }, 100);
    } else {
      this.showSelectTag = true;
    }
    this.renderSuggestMoney(this.amount);
  }
  focusout({ event }: { event: any }) { }
  handleChooseTag(tag: any) {
    this.onChange.emit(tag.value);
  }
  onBlurInput({ event }: { event: any }) {
    this.onChange.emit(this.amount);
    setTimeout(() => {
      this.showSelectTag = false;
    }, 200);
  }
  onClickInput({ event }: { event: any }) {
    this.showSelectTag = true;
    this.renderSuggestMoney(this.amount);
  }
  isSelect(item: any) {
    let result = false;
    const isSelect = this.amount === item;
    if (isSelect) { result = true; }
    return result;
  }

  onRemoveTag({ tag, index }: { tag: any, index: number }) {
    this.onRemove.emit({ tag, index });
  }
  focusInputtag() {
    if (this.showInputCreate) { this.spans.nativeElement.focus(); }
  }
  renderSuggestMoney(value: number) {
    if (value / 1000 < 1) {
      if (value === 0) {
        this.suggestMoney = [
          { value: this.suggestMax / 4, label: 0 },
          { value: this.suggestMax / 2, label: 0 },
          { value: this.suggestMax / 1, label: 0 },
        ];
      } else {
        this.suggestMoney = [
          {
            value: Number((value * 10000).toString().padStart(4, '0')),
            label: 0,
          },
          {
            value: Number((value * 100000).toString().padStart(5, '0')),
            label: 0,
          },
          {
            value: Number((value * 1000000).toString().padStart(6, '0')),
            label: 0,
          },
        ];
      }
      this.suggestMoney = this.suggestMoney.map((suggest: any) => {
        suggest.label = this.mycurrencyPipe.transform(suggest.value);
        return suggest;
      });
    }
  }
}
