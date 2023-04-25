import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListConversationComponent } from './list-conversation.component';
import { ConversationModule } from '../conversation/conversation.module';



@NgModule({
  declarations: [
    ListConversationComponent
  ],
  imports: [
    CommonModule,
    ConversationModule
  ],
  exports: [
    ListConversationComponent
  ],
})
export class ListConversationModule { }
