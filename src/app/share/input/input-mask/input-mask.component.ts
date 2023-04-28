import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-input-mask",
  templateUrl: "./input-mask.component.html",
  styleUrls: ["./input-mask.component.scss"]
})
export class InputMaskComponent implements OnInit, OnChanges {
  @Input() id: string | null = null;
  @Input() className: string | null = null;
  @Input() placeholder: string | null = null;
  @Input() value = 0;
  @Input() align: "left" | "right" = "left";
  @Input() readonly = false;
  @Input() required = false;
  @Input() isQuantity = false;
  @Input() allowNegativeNumbers = false;
  @Input() max: number | null = null;
  @Input() min: number | null = null;
  @Input() defaultOption = {};
  option = {
    mask: "separator.2",
    symbol: "₫",
    thousandSeparator: ","
  };
  @Output() changeValue = new EventEmitter<number>();
  @Output() paste = new EventEmitter<Event>();
  destroy = new Subject();
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    if (!isNaN(Number(String(this.max)))) {
      this.max = Number(String(this.max));
    }
    if (!isNaN(Number(String(this.min)))) {
      this.min = Number(String(this.min));
    }

    if (!this.value) this.value = 0;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
  onPaste(event: Event) {
    this.paste.emit(event);
  }
  onKeyup(isEmit = false) {
    if (typeof this.max === "number" && this.value > this.max) {
      this.value = this.max;
      if (isEmit) {
        this.changeValue.emit(this.max);
      }
    }
    if (typeof this.min === "number" && this.value < this.min) {
      this.value = this.min;
      if (isEmit) {
        this.changeValue.emit(this.value);
      }
    }
  }
  onChange() {
    if (!this.value) this.value = 0;
    this.changeValue.emit(this.value);
  }
}
