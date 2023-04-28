import { Component, Input, OnInit } from "@angular/core";

import { Block, BlockStore, Group } from "~/app/stores";

@Component({
  selector: "app-group-block",
  templateUrl: "./group-block.component.html",
  styleUrls: ["./group-block.component.scss"]
})
export class GroupBlockComponent implements OnInit {
  @Input() group!: Group;
  isCollapsed = false;
  blocks: Block[] = [];

  constructor(private readonly blockStore: BlockStore) {}

  ngOnInit(): void {
    this.blockStore.blocks$.subscribe((blocks) => {
      this.blocks = blocks.filter((block) => block.groupId === this.group.id);
    });
  }

  createBlock() {
    this.blockStore.createBlockEffect(this.group.id);
  }

  activeBlock(block: Block) {
    this.blockStore.activeBlockEffect(block);
  }
}
