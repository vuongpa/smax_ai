import { Component } from "@angular/core";

import { BlockStore } from "~/app/stores";

@Component({
  selector: "app-blocks-content",
  templateUrl: "./blocks-content.component.html",
  styleUrls: ["./blocks-content.component.scss"]
})
export class BlocksContentComponent {
  readonly vm$ = this.blockStore.vm$;

  constructor(readonly blockStore: BlockStore) {}

  addNewGroup() {
    this.blockStore.createGroup();
  }
}
