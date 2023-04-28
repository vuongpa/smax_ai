import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-input-select",
  templateUrl: "./input-select.component.html",
  styleUrls: ["./input-select.component.scss"]
})
export class InputSelectComponent {
  @ViewChild("spans") spans: any;
  @Input() inputType = "input";
  @Input() maxlength = "";
  @Input() customClass = "";
  @Input() tags = "";
  @Input() listItemSelect: Array<any> = [];
  @Input() itemStyleCenter = true;
  @Input() enableRemove = true;
  @Input() defaultColor = "var(--primary)";
  @Input() placeholder = "";
  @Input() tagEmpty = "Thẻ tag rỗng";
  @Input() enableCreateText = true;
  @Input() showInputCreate = true;
  @Input() islistenOnPaste = false;
  @Input() template: any;
  @Input() templateActive: any;
  @Output() onChange = new EventEmitter<any>();
  @Output() onPaste = new EventEmitter<any>();
  @Output() onRemove = new EventEmitter<any>();
  showSelectTag = false;
  constructor(private toastr: ToastrService) {}

  onKeyDownTag({ event }: { event: any }) {
    const value = event.target.value.trim();
    if (value?.length) {
      setTimeout(() => {
        this.showSelectTag = false;
      }, 150);
    } else {
      this.showSelectTag = true;
    }
  }
  focusout({ event }: { event: any }) {
    this.onBlurInput({ event });
  }
  handleChooseTag(tag: any) {
    this.onChange.emit(tag);
  }
  onBlurInput() {
    this.onChange.emit(this.tags);
    setTimeout(() => {
      this.showSelectTag = false;
    }, 150);
  }
  onClickInput() {
    this.showSelectTag = true;
  }
  isSelect(item: any) {
    let result = false;
    const isSelect = this.tags === item;
    if (isSelect) {
      result = true;
    }
    return result;
  }

  onRemoveTag({ tag, index }: { tag: any; index: number }) {
    this.onRemove.emit({ tag, index });
  }

  focusInputtag() {
    if (this.showInputCreate) {
      this.spans.nativeElement.focus();
    }
  }
}
