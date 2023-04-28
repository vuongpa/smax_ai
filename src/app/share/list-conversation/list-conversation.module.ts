import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { ConversationModule } from "../conversation/conversation.module";

import { ListConversationComponent } from "./list-conversation.component";

@NgModule({
  declarations: [ListConversationComponent],
  imports: [CommonModule, ConversationModule],
  exports: [ListConversationComponent]
})
export class ListConversationModule {}
