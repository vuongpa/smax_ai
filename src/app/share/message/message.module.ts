import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { AvatarModule } from "../avatar/avatar.module";

import { MessageComponent } from "./message.component";

@NgModule({
  declarations: [MessageComponent],
  imports: [CommonModule, AvatarModule],
  exports: [MessageComponent]
})
export class MessageModule {}
