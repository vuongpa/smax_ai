import { Component, Input } from '@angular/core';
import { OpenAiChatStore, StoreConversation } from 'src/app/stores';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent {
  @Input() conversation!: StoreConversation;

  readonly vm$ = this.openAiStore.vm$;

  constructor(
    private readonly openAiStore: OpenAiChatStore
  ) {}

  handleDeleteConversation(_id: string) {
    this.openAiStore.removeConversation(_id);
  }

  handleActiveConversation(_id: string) {
    this.openAiStore.activeConversation(_id);
  }
}
