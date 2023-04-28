import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { InputMaskModule } from "src/app/share/input/input-mask/input-mask.module";
import { ListConversationModule } from "src/app/share/list-conversation/list-conversation.module";
import { MessageModule } from "src/app/share/message/message.module";
import { SidebarModule } from "src/app/share/sidebar/sidebar.module";

import { BoardChatComponent } from "./components/board-chat/board-chat.component";
import { GeneratingAnswerComponent } from "./components/generating-answer/generating-answer.component";
import { InputChatComponent } from "./components/input-chat/input-chat.component";
import { PromptStoreComponent } from "./components/prompt-store/prompt-store.component";
import { WelcomeComponent } from "./welcome.component";
import { WelcomeRoutingModule } from "./welcome-routing.module";

@NgModule({
  declarations: [
    WelcomeComponent,
    BoardChatComponent,
    InputChatComponent,
    PromptStoreComponent,
    GeneratingAnswerComponent
  ],
  imports: [CommonModule, WelcomeRoutingModule, SidebarModule, InputMaskModule, ListConversationModule, MessageModule]
})
export class WelcomeModule {}
