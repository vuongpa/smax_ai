import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { FlowComponent } from "./flow.component";

const routers = [{ path: "", component: FlowComponent }];

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports: [RouterModule]
})
export class FlowRoutingModule {}
