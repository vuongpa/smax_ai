import { NgModule } from "@angular/core";
import { FlowComponent } from "./flow.component";
import { RouterModule } from "@angular/router";

const routers = [
  {path: "", component: FlowComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports : [RouterModule]
})
export class FlowRoutingModule{}
