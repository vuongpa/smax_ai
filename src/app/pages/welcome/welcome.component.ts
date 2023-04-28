import { Component, EventEmitter, Output } from "@angular/core";
import { OpenAiChatStore } from "src/app/stores";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent {
  @Output() createChat = new EventEmitter<boolean>();

  constructor(private readonly openAiChatStore: OpenAiChatStore) {}

  handleCreateChat() {
    this.openAiChatStore.createNewConversation();
  }
}
