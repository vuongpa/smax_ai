import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { FlowComponent } from './flow.component';
import { FlowRoutingModule } from './flow-routing.module';
import { FloatActionsComponent } from './components/float-actions/float-actions.component';
import { BlockNodeComponent } from './components/block-node/block-node.component';
import { BlockNodesContainerComponent } from './components/block-nodes-container/block-nodes-container.component';

@NgModule({
  declarations: [
    FlowComponent,
    FloatActionsComponent,
    BlockNodeComponent,
    BlockNodesContainerComponent,
  ],
  imports: [
    CommonModule,
    FlowRoutingModule,
    NgbTooltipModule,
    NgbDropdownModule,
  ]
})
export class FlowModule { }
