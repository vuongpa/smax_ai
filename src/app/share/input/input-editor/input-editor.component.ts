import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-editor',
  templateUrl: './input-editor.component.html',
  styleUrls: ['./input-editor.component.scss']
})
export class InputEditorComponent implements OnInit {
  ckeConfig = {
    lang: 'en',
    extraPlugins: 'youtube,colorbutton,justify',
    removeButtons: 'Copy,Cut,Paste,Undo,Redo,Print,PasteText,PasteFromWord',
    height: '150px'
  };
  @Input() content!: string;
  @Output() contentChange: EventEmitter<string> = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() blur: EventEmitter<string> = new EventEmitter();
  timeOut: any;
  constructor() { }
  ngOnInit(): void { }
  onChangeContent() {
    this.contentChange.emit(this.content);
  }
  onBlur() {
    this.blur.emit(this.content);
  }

}
