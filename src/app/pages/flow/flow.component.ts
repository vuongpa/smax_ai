import { Component } from "@angular/core";
import { BlockStore } from "src/app/stores";

@Component({
  selector: "app-flow",
  templateUrl: "./flow.component.html",
  styleUrls: ["./flow.component.scss"]
})
export class FlowComponent {
  constructor(readonly blockStore: BlockStore) {}
}
