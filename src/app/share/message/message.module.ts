import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageComponent } from './message.component';
import { AvatarModule } from '../avatar/avatar.module';



@NgModule({
  declarations: [
    MessageComponent
  ],
  imports: [
    CommonModule,
    AvatarModule
  ],
  exports: [MessageComponent]
})
export class MessageModule { }
