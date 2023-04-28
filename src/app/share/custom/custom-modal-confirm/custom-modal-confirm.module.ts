import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { CustomModalConfirmComponent } from "./custom-modal-confirm.component";

@NgModule({
  declarations: [CustomModalConfirmComponent],
  exports: [CustomModalConfirmComponent],
  imports: [CommonModule]
})
export class CustomModalConfirmModule {}
