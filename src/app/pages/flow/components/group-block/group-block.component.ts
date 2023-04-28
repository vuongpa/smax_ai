import { AfterViewInit, Component, Input, OnInit } from "@angular/core";

import { Block, BlockStore, Group } from "~/app/stores";

@Component({
  selector: "app-group-block",
  templateUrl: "./group-block.component.html",
  styleUrls: ["./group-block.component.scss"]
})
export class GroupBlockComponent implements AfterViewInit, OnInit {
  @Input() group!: Group;
  isCollapsed = false;
  blocks: Block[] = [];

  constructor(private readonly blockStore: BlockStore) {}

  ngOnInit(): void {
    this.blockStore.blocks$.subscribe((blocks) => {
      this.blocks = blocks.filter((block) => block.groupId === this.group.id);
    });
  }

  ngAfterViewInit(): void {
    if (this.group.active) {
      this.blockStore.loadBlockContainer(this.group.id).unsubscribe();
      setTimeout(() => {
        this.blockStore.createConnectionBetweenBlocks(this.group.id).unsubscribe();
      });
    }
  }

  createBlock() {
    this.blockStore.createBlock(this.group.id);
  }
}
