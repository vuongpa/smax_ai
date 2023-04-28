import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild } from "@angular/core";
import { OpenAiChatStore } from "src/app/stores";

@Component({
  selector: "app-input-chat",
  templateUrl: "./input-chat.component.html",
  styleUrls: ["./input-chat.component.scss"]
})
export class InputChatComponent implements OnChanges, AfterViewInit {
  @Input() activeConversationId!: string;
  @ViewChild("input_chat") refInput!: ElementRef<HTMLInputElement>;

  @Output() focusInput = new EventEmitter();

  constructor(private readonly openAiChatStore: OpenAiChatStore) {}

  focusInputChat() {
    if (!this.refInput) {
      return;
    }

    this.refInput.nativeElement.focus();
    this.refInput.nativeElement.value = "";
  }

  sendMessage() {
    const message = this.refInput.nativeElement.value;
    if (!message) {
      return;
    }

    this.openAiChatStore.sendMessageEffect(message);
    this.focusInputChat();
  }

  ngAfterViewInit(): void {
    this.focusInputChat();
  }

  ngOnChanges(): void {
    this.focusInputChat();
  }
}
