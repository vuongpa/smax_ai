import { AfterViewInit, Component, Input, OnDestroy } from "@angular/core";

import { BlockService } from "~/app/services/features";
import { Block, BlockStore } from "~/app/stores";

@Component({
  selector: "app-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"]
})
export class BlockComponent implements AfterViewInit, OnDestroy {
  @Input() block!: Block;
  connections$ = this.blockStore.connections$;

  constructor(
    private readonly blockStore: BlockStore,
    private readonly blockService: BlockService
  ) {}

  ngOnDestroy(): void {
    this.blockService.removeConnectionsOfBlock(this.block.id);
    this.blockService.removeNode(this.block.id);
  }

  ngAfterViewInit(): void {
    this.blockStore.insertBlockToMap(this.block);
  }
}
