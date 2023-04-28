import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { MessageModule } from "../message/message.module";

import { ConversationComponent } from "./conversation.component";

@NgModule({
  declarations: [ConversationComponent],
  imports: [CommonModule, MessageModule],
  exports: [ConversationComponent]
})
export class ConversationModule {}
