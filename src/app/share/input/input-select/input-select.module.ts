import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { InputSelectComponent } from "./input-select.component";

@NgModule({
  declarations: [InputSelectComponent],
  imports: [CommonModule, FormsModule],
  exports: [InputSelectComponent]
})
export class InputSelectModule {}
