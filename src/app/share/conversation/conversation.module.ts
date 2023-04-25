import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConversationComponent } from './conversation.component';
import { MessageModule } from '../message/message.module';



@NgModule({
  declarations: [
    ConversationComponent
  ],
  imports: [
    CommonModule,
    MessageModule
  ],
  exports: [
    ConversationComponent,
  ]
})
export class ConversationModule { }
