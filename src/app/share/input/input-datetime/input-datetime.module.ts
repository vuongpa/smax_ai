import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { TimepickerModule } from "ngx-bootstrap/timepicker";

import { InputDatetimeComponent } from "./input-datetime.component";

@NgModule({
  declarations: [InputDatetimeComponent],
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot()
  ],
  exports: [InputDatetimeComponent]
})
export class InputDatetimeModule {}
