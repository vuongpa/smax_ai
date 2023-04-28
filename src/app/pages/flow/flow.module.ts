import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { NgbCollapseModule, NgbDropdownModule, NgbNavModule, NgbTooltipModule } from "@ng-bootstrap/ng-bootstrap";
import { BlockService } from "src/app/services/features";
import { BlockStore } from "src/app/stores";

import { BlockComponent } from "./components/block/block.component";
import { BlockContainerComponent } from "./components/block-container/block-container.component";
import { BlocksContentComponent } from "./components/blocks-content/blocks-content.component";
import { FloatActionsComponent } from "./components/float-actions/float-actions.component";
import { GroupBlockComponent } from "./components/group-block/group-block.component";
import { SidebarComponent } from "./components/sidebar/sidebar.component";
import { TriggersContentComponent } from "./components/triggers-content/triggers-content.component";
import { FlowComponent } from "./flow.component";
import { FlowRoutingModule } from "./flow-routing.module";

@NgModule({
  declarations: [
    FlowComponent,
    FloatActionsComponent,
    SidebarComponent,
    TriggersContentComponent,
    BlocksContentComponent,
    BlockComponent,
    GroupBlockComponent,
    BlockContainerComponent
  ],
  imports: [CommonModule, FlowRoutingModule, NgbTooltipModule, NgbDropdownModule, NgbNavModule, NgbCollapseModule],
  providers: [BlockStore, BlockService]
})
export class FlowModule {}
