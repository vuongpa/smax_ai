import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { TooltipModule } from "ngx-bootstrap/tooltip";

import { SidebarComponent } from "./sidebar.component";

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule, RouterModule, TooltipModule.forRoot()],
  exports: [SidebarComponent]
})
export class SidebarModule {}
