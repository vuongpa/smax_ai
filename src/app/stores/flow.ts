import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { JsPlumbService } from "../services/features/jsplumb.service";
import { DragEventCallbackOptions } from "jsplumb";

export interface BlockNode {
  id: string,
  top: number,
  left: number,
}

export interface Connection {
  uuids: string[];
}

export interface FlowState {
  block_nodes: BlockNode[];
  connections: Connection[];
}

const sampleData = {
  block_nodes: [
    {
      id: "Welcome Block",
      name: "Welcome Block",
      top: 57,
      left: 67
    },
    {
      id: "WcOtoXeMay",
      name: "WcOtoXeMay",
      top: 177,
      left: 350
    },
    {
      id: "DiaChiMotor",
      name: "DiaChiMotor",
      top: 53,
      left: 630
    },
  ],
  connections: [
    {
      uuids: [
        "WcOtoXeMay_right",
        "DiaChiMotor_left"
      ]
    },
    {
      uuids: [
        "Welcome Block_right",
        "WcOtoXeMay_left"
      ]
    }
  ]
}

const initialState: FlowState = {
  block_nodes: sampleData.block_nodes,
  connections: sampleData.connections
}

@Injectable({providedIn: "root"})
export class FlowStore extends ComponentStore<FlowState> {
  readonly block_nodes$ = this.select(s => s.block_nodes);
  readonly connections$ = this.select(s => s.connections);

  readonly vm$ = this.select(
    this.block_nodes$,
    this.connections$,
    (block_nodes, connections) => ({block_nodes, connections}),
    {debounce: true}
  );

  constructor(
    private readonly jsPlumbService: JsPlumbService
  ) {
    super(initialState);
  }

  readonly addBlockNode = this.updater((state, node: BlockNode) => {
    return {
      ...state,
      block_nodes: [...state.block_nodes, node]
    }
  })

  readonly addConnection = this.updater((state, connection: Connection) => {
    return {
      ...state,
      connections: [...state.connections, connection]
    }
  })

  readonly updatePositionBlockNode = this.updater((state, node: BlockNode) => {
    return {
      ...state,
      block_nodes: state.block_nodes.map(n => {
        if (n.id !== node.id) return n;
        return node;
      })
    }
  })

  createConnectionsForBlockNode(blockNodeId: string) {
    const dropOptions = {
      tolerance: 'touch',
      hoverClass: 'dropHover',
      activeClass: 'dragActive',
    };

    this.jsPlumbService.jsPlumbInstance.addEndpoint(
      blockNodeId,
      { anchor: 'Right', uuid: `${blockNodeId}_right`, maxConnections: 1 },
      {
        endpoint: ['Dot', { radius: 3 }],
        paintStyle: { fill: '#17234e' },
        isSource: true,
        scope: 'jsPlumb_DefaultScope',
        connectorStyle: { stroke: '#17234e', strokeWidth: 1 },
        connector: ['Bezier', { curviness: 63 }],
        maxConnections: 2,
        isTarget: false,
        connectorOverlays: [
          [
            'Arrow', { 
              width: 8,
              length: 6,
              location: 1, 
            }
          ]
        ],
        dropOptions,
      }
    );
    
    this.jsPlumbService.jsPlumbInstance.addEndpoint(
      blockNodeId,
      {anchor: 'Left', uuid: `${blockNodeId}_left`, maxConnections: 1},
      {
        endpoint: ['Dot', { radius: 3 }],
        isSource: false,
        scope: 'jsPlumb_DefaultScope',
        maxConnections: 2,
        isTarget: true,
        dropOptions,
      }
    )

    this.jsPlumbService.jsPlumbInstance.draggable(blockNodeId, {
      stop: (ev: DragEventCallbackOptions) => {
        const left = ev.pos[0];
        const top = ev.pos[1];
        this.updatePositionBlockNode({id: blockNodeId, top, left})
      },
    });
  }
}
