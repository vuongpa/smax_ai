import { Component } from "@angular/core";
import { OpenAiChatStore } from "src/app/stores";

@Component({
  selector: "app-list-conversation",
  templateUrl: "./list-conversation.component.html",
  styleUrls: ["./list-conversation.component.scss"]
})
export class ListConversationComponent {
  readonly vm$ = this.openAIStore.vm$;

  constructor(private readonly openAIStore: OpenAiChatStore) {}
}
