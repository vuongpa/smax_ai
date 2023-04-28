import { Injectable } from "@angular/core";
import { ConnectParams, DragOptions, jsPlumb } from "jsplumb";

import { Block } from "~/app/stores";

@Injectable({ providedIn: "root" })
export class BlockService {
  rootViewContainer!: any;
  jsPlumbInstance = jsPlumb.getInstance();

  createViewContainerRef(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
  }

  addConnection(connectParams: ConnectParams) {
    this.jsPlumbInstance.connect(connectParams);
  }

  createEndpointsForBlockNode(block: Block) {
    const dropOptions = {
      tolerance: "touch",
      hoverClass: "dropHover",
      activeClass: "dragActive"
    };
    this.jsPlumbInstance.addEndpoint(
      block.id,
      { anchor: "Right", uuid: `${block.id}_right`, maxConnections: 1 },
      {
        endpoint: ["Dot", { radius: 3 }],
        paintStyle: { fill: "#17234e" },
        isSource: true,
        connectorStyle: { stroke: "#17234e", strokeWidth: 1 },
        connector: ["Bezier", { curviness: 63 }],
        maxConnections: 40,
        isTarget: false,
        connectorOverlays: [
          [
            "Arrow",
            {
              width: 8,
              length: 6,
              location: 1
            }
          ]
        ],
        scope: "target_scope",
        dropOptions
      }
    );
    this.jsPlumbInstance.addEndpoint(
      block.id,
      { anchor: "Left", uuid: `${block.id}_left`, maxConnections: 1 },
      {
        endpoint: ["Dot", { radius: 3 }],
        isSource: false,
        maxConnections: 40,
        isTarget: true,
        dropOptions,
        scope: "target_scope"
      }
    );
  }

  createDraggable(blockId: string, options?: DragOptions) {
    this.jsPlumbInstance.draggable(blockId, options);
  }

  createMapNode(
    block: Block,
    options?: {
      dragOptions?: DragOptions;
    }
  ) {
    this.createEndpointsForBlockNode(block);
    this.createDraggable(block.id, options?.dragOptions);
  }

  clearConnection() {
    this.jsPlumbInstance.deleteEveryConnection();
  }

  clearEndpoint() {
    this.jsPlumbInstance.deleteEveryEndpoint();
  }

  removeNode(blockId: string) {
    this.removeConnectionsOfBlock(blockId);
    this.jsPlumbInstance.remove(blockId);
  }

  removeConnectionsOfBlock(blockId: string) {
    this.jsPlumbInstance.removeAllEndpoints(blockId);
  }
}
