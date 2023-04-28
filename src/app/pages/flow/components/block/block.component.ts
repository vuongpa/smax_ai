import { Component, Input } from "@angular/core";

import { Block } from "~/app/stores";

@Component({
  selector: "app-block",
  templateUrl: "./block.component.html",
  styleUrls: ["./block.component.scss"]
})
export class BlockComponent {
  @Input() block!: Block;
}
