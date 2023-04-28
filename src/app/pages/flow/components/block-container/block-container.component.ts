import { AfterViewInit, Component, ViewChild, ViewContainerRef } from "@angular/core";

import { BlockService } from "~/app/services/features";

@Component({
  selector: "app-block-container",
  templateUrl: "./block-container.component.html",
  styleUrls: ["./block-container.component.scss"]
})
export class BlockContainerComponent implements AfterViewInit {
  @ViewChild("block_container", { read: ViewContainerRef })
  viewContainerRef!: ViewContainerRef;

  constructor(private readonly blockService: BlockService) {}

  ngAfterViewInit(): void {
    this.blockService.createViewContainerRef(this.viewContainerRef);
  }
}
