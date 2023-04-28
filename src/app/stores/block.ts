import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { DragEventCallbackOptions } from "jsplumb";
import { map, Observable, withLatestFrom } from "rxjs";
import * as uuid from "uuid";

import { BlockService } from "../services/features";

export interface Block {
  id: string;
  top: number;
  left: number;
  active: boolean;
  name: string;
  groupId: string;
}

export interface Connection {
  uuids: [string, string];
  groupId: string;
}

export interface Group {
  name: string;
  id: string;
  active: boolean;
}

export interface BlockState {
  groups: Group[];
  blocks: Block[];
  connections: Connection[];
}

const sampleData = {
  blocks: [
    {
      id: uuid.v4(),
      name: "Welcome Block",
      top: 57,
      left: 67,
      active: true
    },
    {
      id: uuid.v4(),
      name: "WcOtoXeMay",
      top: 177,
      left: 350,
      active: false
    },
    {
      id: uuid.v4(),
      name: "DiaChiMotor",
      top: 53,
      left: 630,
      active: false
    }
  ],
  connections: [
    {
      uuids: ["WcOtoXeMay_right", "DiaChiMotor_left"]
    },
    {
      uuids: ["Welcome Block_right", "WcOtoXeMay_left"]
    }
  ]
};

@Injectable({ providedIn: "root" })
export class BlockStore extends ComponentStore<BlockState> {
  // Default selectors
  readonly groups$ = this.select((s) => s.groups);
  readonly blocks$ = this.select((s) => s.blocks);
  readonly connections$ = this.select((s) => s.connections);
  readonly blocksByGroupId$!: Observable<Block[]>;

  // View Selectors
  readonly activeGroup$ = this.select(this.groups$, (groups) => groups.find((group) => group.active));
  readonly actionBlock$ = this.select(this.blocks$, (blocks) => blocks.find((block) => block.active));

  readonly vm$ = this.select(
    this.groups$,
    this.activeGroup$,
    this.blocks$,
    this.connections$,
    (groups, activeGroup, blocks, connections) => ({ groups, activeGroup, blocks, connections }),
    { debounce: true }
  );

  constructor(private readonly blockService: BlockService) {
    const groupId = uuid.v4();
    super({
      blocks: sampleData.blocks.map((block) => ({ ...block, groupId })),
      connections: sampleData.connections.map((connection) => ({ ...connection, groupId })) as Connection[],
      groups: [
        {
          name: "SAMPLE DATA",
          id: groupId,
          active: true
        }
      ]
    });
  }

  // Updaters
  private readonly addBlock = this.updater((state, block: Block) => ({
    ...state,
    blocks: [...state.blocks, block]
  }));

  private readonly addGroup = this.updater((state, group: Group) => ({
    ...state,
    groups: [...state.groups, group]
  }));

  private readonly addConnection = this.updater((state, connection: Connection) => ({
    ...state,
    connections: [...state.connections, connection]
  }));

  private readonly replaceBlock = this.updater((state, blockUpdater: Block) => {
    return {
      ...state,
      blocks: [
        ...state.blocks.map((block) => {
          if (block.id === blockUpdater.id) return blockUpdater;
          return block;
        })
      ]
    };
  });

  // Effects
  readonly loadBlockContainer = this.effect((id$: Observable<string>) =>
    id$.pipe(
      withLatestFrom(this.blocks$),
      map(([id, blocks]) => {
        const blocksByGroupId = blocks.filter((block) => block.groupId === id);
        blocksByGroupId.forEach((blockItem) => {
          this.blockService.addDynamicBlock(blockItem);
        });
        setTimeout(() => {
          blocksByGroupId.forEach((blockItem) => {
            this.createConnectionsForBlockNode(blockItem);
          });
        });
      })
    )
  );

  readonly createBlock = this.effect((groupId$: Observable<string>) =>
    groupId$.pipe(
      withLatestFrom(this.blocks$),
      map(([groupId, blocks]) => {
        const blocksByGroupId = blocks.filter((b) => b.groupId === groupId).sort((a, b) => a.left - b.left);
        const lastBlock = blocksByGroupId?.[blocksByGroupId.length - 1];
        const left = lastBlock ? lastBlock.left + 300 : 20;
        const top = lastBlock ? lastBlock.top : 50;

        const newBlock = {
          groupId,
          id: uuid.v4(),
          name: `Block ${(blocksByGroupId?.length || 0) + 1}`,
          top,
          left,
          active: false
        };

        this.addBlock(newBlock);
        this.blockService.addDynamicBlock(newBlock);
        setTimeout(() => {
          this.createConnectionsForBlockNode(newBlock);
        });
      })
    )
  );

  createGroup() {
    this.addGroup({
      name: "UNNAMED GROUP",
      id: uuid.v4(),
      active: false
    });
  }

  readonly createConnectionBetweenBlocks = this.effect((id$: Observable<string>) =>
    id$.pipe(
      withLatestFrom(this.connections$),
      map(([id, connections]) => {
        const connectionsByGroupId = connections.filter((connection) => connection.groupId === id);
        connectionsByGroupId.forEach((connectionItem) => {
          this.blockService.addConnection(connectionItem);
        });
      })
    )
  );

  createConnectionsForBlockNode(block: Block) {
    const dropOptions = {
      tolerance: "touch",
      hoverClass: "dropHover",
      activeClass: "dragActive"
    };

    this.blockService.jsPlumbInstance.addEndpoint(
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
        dropOptions
      }
    );

    this.blockService.jsPlumbInstance.addEndpoint(
      block.id,
      { anchor: "Left", uuid: `${block.id}_left`, maxConnections: 1 },
      {
        endpoint: ["Dot", { radius: 3 }],
        isSource: false,
        maxConnections: 40,
        isTarget: true,
        dropOptions
      }
    );

    this.blockService.jsPlumbInstance.draggable(block.id, {
      stop: (ev: DragEventCallbackOptions) => {
        const left = ev.pos[0];
        const top = ev.pos[1];
        this.replaceBlock({ ...block, left, top });
      }
    });
  }
}
