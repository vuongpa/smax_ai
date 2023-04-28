import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";

import { InputMaskComponent } from "./input-mask.component";

@NgModule({
  declarations: [InputMaskComponent],
  imports: [CommonModule, FormsModule, NgxMaskModule.forRoot()],
  exports: [InputMaskComponent]
})
export class InputMaskModule {}
