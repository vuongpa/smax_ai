import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { ConnectParams, DragEventCallbackOptions, DragOptions } from "jsplumb";
import { Observable, withLatestFrom } from "rxjs";
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

export interface Connection extends ConnectParams {
  groupId: string;
  sourceBlockId: string;
  targetBlockId: string;
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
const blockId_1 = uuid.v4();
const blockId_2 = uuid.v4();
const blockId_3 = uuid.v4();
const groupId_1 = uuid.v4();

const sampleData: {
  blocks: Block[];
  connections: Connection[];
  groups: Group[];
} = {
  blocks: [
    {
      id: blockId_1,
      name: "Welcome Block",
      top: 57,
      left: 67,
      active: true,
      groupId: groupId_1
    },
    {
      id: blockId_2,
      name: "WcOtoXeMay",
      top: 177,
      left: 350,
      active: false,
      groupId: groupId_1
    },
    {
      id: blockId_3,
      name: "DiaChiMotor",
      top: 53,
      left: 630,
      active: false,
      groupId: groupId_1
    }
  ],
  connections: [
    {
      uuids: [`${blockId_2}_right`, `${blockId_3}_left`],
      groupId: groupId_1,
      sourceBlockId: blockId_2,
      targetBlockId: blockId_3
    },
    {
      uuids: [`${blockId_1}_right`, `${blockId_2}_left`],
      groupId: groupId_1,
      sourceBlockId: blockId_1,
      targetBlockId: blockId_2
    }
  ],
  groups: [
    {
      name: "SAMPLE DATA",
      id: groupId_1,
      active: true
    }
  ]
};

@Injectable({ providedIn: "root" })
export class BlockStore extends ComponentStore<BlockState> {
  // Default selectors
  readonly groups$ = this.select((s) => s.groups);
  readonly blocks$ = this.select((s) => s.blocks);
  readonly connections$ = this.select((s) => s.connections);

  // View Selectors
  readonly activeGroup$ = this.select(this.groups$, (groups) =>
    groups.find((group) => group.active)
  );
  readonly activeConnections$ = this.select(
    this.connections$,
    this.activeGroup$,
    (connections, activeGroup) =>
      connections.filter((connection) => connection.groupId === activeGroup?.id)
  );
  readonly activeBlocks$ = this.select(this.blocks$, this.activeGroup$, (blocks, activeGroup) =>
    blocks.filter((block) => block.groupId === activeGroup?.id)
  );

  readonly vm$ = this.select(
    this.groups$,
    this.activeGroup$,
    this.blocks$,
    this.connections$,
    (groups, activeGroup, blocks, connections) => ({ groups, activeGroup, blocks, connections }),
    { debounce: true }
  );

  constructor(private readonly blockService: BlockService) {
    super({
      blocks: sampleData.blocks,
      connections: sampleData.connections,
      groups: sampleData.groups
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

  readonly removeConnection = this.updater(
    (state, { sourceId, targetId }: { sourceId: string; targetId: string }) => ({
      ...state,
      connections: state.connections.filter(
        (connection) =>
          connection.sourceBlockId !== sourceId && connection.targetBlockId !== targetId
      )
    })
  );

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

  readonly activeGroup = this.updater((state, groupId: string) => {
    return {
      ...state,
      groups: state.groups.map((group) => {
        if (group.id === groupId) {
          return { ...group, active: true };
        }
        return { ...group, active: false };
      })
    };
  });

  readonly activeBlock = this.updater((state, block: Block) => {
    const blockId = block.id;
    const groupId = block.groupId;
    return {
      ...state,
      groups: state.groups.map((group) => {
        if (group.id === groupId) {
          return { ...group, active: true };
        }
        return { ...group, active: false };
      }),
      blocks: state.blocks.map((block) => {
        if (block.id === blockId) {
          return { ...block, active: true };
        }
        return { ...block, active: false };
      })
    };
  });

  // Effects
  readonly activeBlockEffect = this.effect((block$: Observable<Block>) =>
    block$.pipe(
      tapResponse(
        (block) => {
          this.activeBlock(block);
        },
        (error) => console.log("Active block error: ", error)
      )
    )
  );

  readonly addConnectionEffect = this.effect(
    (connection$: Observable<{ targetId: string; sourceId: string }>) =>
      connection$.pipe(
        withLatestFrom(this.blocks$),
        tapResponse(
          ([connection, blocks]) => {
            const { targetId, sourceId } = connection;
            const groupId = blocks.find(
              (block) => block.id === targetId || block.id === sourceId
            )?.groupId;
            if (!groupId) {
              return;
            }

            this.addConnection({
              targetBlockId: targetId,
              sourceBlockId: sourceId,
              groupId,
              uuids: [`${sourceId}_right`, `${targetId}_left`]
            });
          },
          (error) => console.log("add connection error:", error)
        )
      )
  );

  readonly createBlockEffect = this.effect((groupId$: Observable<string>) =>
    groupId$.pipe(
      withLatestFrom(this.blocks$),
      tapResponse(
        ([groupId, blocks]) => {
          const blocksByGroupId = blocks
            .filter((b) => b.groupId === groupId)
            .sort((a, b) => a.left - b.left);
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
        },
        (err) => console.log(err)
      )
    )
  );

  readonly insertActiveBlocksToMap = this.effect((triggers$) =>
    triggers$.pipe(
      withLatestFrom(this.activeBlocks$),
      tapResponse(
        ([, activeBlocks]) => {
          console.log("activeBlocks:", activeBlocks);
          if (!activeBlocks?.length) {
            return;
          }
          activeBlocks.forEach((block) => {
            this.insertBlockToMap(block);
          });
        },
        (err) => console.log("insert active blocks to map error:", err)
      )
    )
  );

  readonly insertActiveConnectionsToMap = this.effect((triggers$) =>
    triggers$.pipe(
      withLatestFrom(this.activeConnections$),
      tapResponse(
        ([, actionsConnections]) => {
          if (!actionsConnections?.length) {
            return;
          }
          actionsConnections.forEach((connection) => {
            this.insertConnectionToMap(connection);
          });
        },
        (err) => console.log("insert active connections to map error:", err)
      )
    )
  );

  // Functions
  createDraggableForBlock(block: Block) {
    const draggableOptions: DragOptions = {
      stop: (ev: DragEventCallbackOptions) => {
        const left = ev.pos[0];
        const top = ev.pos[1];
        this.replaceBlock({ ...block, left, top });
      }
    };
    this.blockService.createDraggable(block.id, draggableOptions);
  }

  createBlock(block: Block) {
    this.addBlock(block);

    setTimeout(() => {
      this.blockService.createEndpointsForBlockNode(block);
      this.createDraggableForBlock(block);
    });
  }

  createGroup() {
    this.addGroup({
      name: "UNNAMED GROUP",
      id: uuid.v4(),
      active: false
    });
  }

  insertBlockToMap(
    block: Block,
    options: {
      dragOptions?: DragOptions;
    } = {
      dragOptions: {
        stop: (ev: DragEventCallbackOptions) => {
          const left = ev.pos[0];
          const top = ev.pos[1];
          this.replaceBlock({ ...block, left, top });
        }
      }
    }
  ) {
    this.blockService.createMapNode(block, options);
  }

  insertConnectionToMap(connection: Connection) {
    this.blockService.addConnection(connection);
  }

  clearMap() {
    this.blockService.clearConnection();
    this.blockService.clearEndpoint();
  }
}
