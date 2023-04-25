import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from "./welcome.component";

const routers = [
  {path: '', component: WelcomeComponent}
]

@NgModule({
  imports: [RouterModule.forChild(routers)],
  exports : [RouterModule]
})
export class WelcomeRoutingModule{}
