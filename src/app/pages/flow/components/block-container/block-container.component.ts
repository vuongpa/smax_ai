import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";

import { BlockService } from "~/app/services/features";
import { BlockStore } from "~/app/stores";

@Component({
  selector: "app-block-container",
  templateUrl: "./block-container.component.html",
  styleUrls: ["./block-container.component.scss"]
})
export class BlockContainerComponent implements AfterViewInit {
  @ViewChild("block_container", { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  activeBlocks$ = this.blockStore.activeBlocks$;
  activeConnections$ = this.blockStore.activeConnections$;

  constructor(
    private readonly blockService: BlockService,
    private readonly blockStore: BlockStore
  ) {}

  ngAfterViewInit(): void {
    this.blockService.createViewContainerRef(this.viewContainerRef);
    this.activeBlocks$.subscribe(() => {
      setTimeout(() => {
        this.activeConnections$
          .subscribe((connections) => {
            setTimeout(() => {
              this.blockService.clearConnection();
              connections.forEach((connection) => {
                this.blockService.addConnection(connection);
              });
            });
          })
          .unsubscribe();
      });
    });
  }
}
