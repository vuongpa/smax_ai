import { Component, Input } from "@angular/core";

import { Block } from "~/app/stores";

@Component({
  selector: "app-block-details",
  templateUrl: "./block-details.component.html",
  styleUrls: ["./block-details.component.scss"]
})
export class BlockDetailsComponent {
  @Input() block!: Block;
}
