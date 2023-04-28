import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotfoundComponent } from "./pages/notfound/notfound.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import("./pages/welcome/welcome.module").then((module) => module.WelcomeModule)
  },
  {
    path: "flow",
    loadChildren: () => import("./pages/flow/flow.module").then((module) => module.FlowModule)
  },
  { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
