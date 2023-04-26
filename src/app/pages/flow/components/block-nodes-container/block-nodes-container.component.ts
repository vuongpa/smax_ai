import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';

import { JsPlumbService } from 'src/app/services/features/jsplumb.service';
import { FlowStore } from 'src/app/stores';

@Component({
  selector: 'app-block-nodes-container',
  templateUrl: './block-nodes-container.component.html',
  styleUrls: ['./block-nodes-container.component.scss']
})
export class BlockNodesContainerComponent implements AfterViewInit {
  private block_nodes$ = this.flowStore.block_nodes$;
  private connections$ = this.flowStore.connections$;

  @ViewChild('block_nodes_container', { read: ViewContainerRef }) 
  viewContainerRef!: ViewContainerRef;
  
  constructor(
    private readonly flowStore: FlowStore,
    private readonly jsPlumbService: JsPlumbService
  ) {}

  ngAfterViewInit(): void {
    this.jsPlumbService.setRootViewContainerRef(this.viewContainerRef);
    
    this.block_nodes$.subscribe((block_nodes) => {
      block_nodes.forEach((node, idx: number) => {
        this.jsPlumbService.addDynamicNode(node, this.viewContainerRef, idx);
      });
    }).unsubscribe();

    setTimeout(() => {
      this.connections$.subscribe(connections => {
        connections.forEach((connection) => {
          this.jsPlumbService.addConnection(connection);
        });
      }).unsubscribe();
    })
  }

  addNode() {
    const node = { id: 'Step id_' + [Math.random().toString(16).slice(2, 8)] };
    this.jsPlumbService.addDynamicNode(node, this.viewContainerRef, +Math.random().toString(16).slice(2, 8) );
    this.flowStore.addBlockNode({ id: node.id, top: 20, left: 20 })
  }
}
